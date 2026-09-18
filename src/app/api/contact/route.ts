import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { brand } from "@/data/nav";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interestedIn: string;
  sessionDate: string;
  budget: string;
};

const REQUIRED_FIELDS: (keyof ContactPayload)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "interestedIn",
  "sessionDate",
  "budget",
];

function isContactPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  return REQUIRED_FIELDS.every((field) => typeof (body as Record<string, unknown>)[field] === "string");
}

/** Form values land straight in the HTML below, so escape them — otherwise a
 * name/interest containing `<`, `&`, etc. would break the markup. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Table-based layout with inline styles throughout — the only markup style
 * that renders consistently across email clients (Gmail, Outlook, Apple
 * Mail strip <style> blocks and most CSS layout properties). Colors are
 * hardcoded to match the site's globals.css palette since email clients
 * can't read CSS custom properties. */
function buildInquiryEmailHtml(payload: ContactPayload): string {
  const { firstName, lastName, email, phone, interestedIn, sessionDate, budget } = payload;
  const fields: [string, string][] = [
    ["Name", `${firstName} ${lastName}`],
    ["Email", email],
    ["Phone", phone],
    ["Interested In", interestedIn],
    ["Date of Session", sessionDate],
    ["Budget", `₹${budget}`],
  ];

  const fieldRows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 0 0 12px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border: 1px solid #e7e4dd; border-radius: 6px;">
              <tr>
                <td style="padding: 14px 18px;">
                  <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #6b6a63; margin-bottom: 4px;">
                    ${escapeHtml(label)}
                  </div>
                  <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: #141412;">
                    ${escapeHtml(value)}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`
    )
    .join("");

  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    `Re: Your inquiry with ${brand.name}`
  )}`;

  return `
<!DOCTYPE html>
<html>
  <body style="margin: 0; padding: 0; background: #f6f4ec;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f6f4ec;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background: #f6f4ec;">
            <!-- Header -->
            <tr>
              <td style="background: #3f4238; padding: 32px 28px; border-radius: 8px 8px 0 0; text-align: center;">
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #cfc9b8; margin-bottom: 10px;">
                  A New Inquiry Has Arrived
                </div>
                <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 24px; letter-spacing: 0.04em; text-transform: uppercase; color: #ffffff;">
                  ${escapeHtml(brand.name)}
                </div>
              </td>
            </tr>

            <!-- Fields -->
            <tr>
              <td style="background: #f6f4ec; padding: 28px 24px 8px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${fieldRows}
                </table>
              </td>
            </tr>

            <!-- Reply button -->
            <tr>
              <td style="background: #f6f4ec; padding: 8px 24px 28px 24px; text-align: center;">
                <a href="${replyHref}" style="display: inline-block; background: #a9895d; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; padding: 14px 32px; border-radius: 999px;">
                  Reply to ${escapeHtml(firstName)}
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px 24px; border-top: 1px solid #e7e4dd; text-align: center;">
                <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 13px; color: #3f4238; margin-bottom: 4px;">
                  ${escapeHtml(brand.name)}
                </div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #6b6a63; line-height: 1.6;">
                  ${escapeHtml(brand.email)} &nbsp;·&nbsp; ${escapeHtml(brand.phone)}<br />
                  ${escapeHtml(brand.location)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const contactTo = process.env.CONTACT_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailAppPassword || !contactTo) {
    return NextResponse.json({ error: "Email is not configured on the server." }, { status: 500 });
  }

  const body: unknown = await request.json().catch(() => null);
  if (!isContactPayload(body)) {
    return NextResponse.json({ error: "Missing or invalid form fields." }, { status: 400 });
  }

  const { firstName, lastName, email, phone, interestedIn, sessionDate, budget } = body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: { name: `${firstName} ${lastName}`, address: gmailUser },
      to: contactTo,
      replyTo: email,
      subject: `New inquiry from ${firstName} ${lastName}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Interested in: ${interestedIn}`,
        `Session date: ${sessionDate}`,
        `Budget: ₹${budget}`,
      ].join("\n"),
      html: buildInquiryEmailHtml(body),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Gmail send failed:", error);
    return NextResponse.json({ error: "Failed to send inquiry." }, { status: 502 });
  }
}
