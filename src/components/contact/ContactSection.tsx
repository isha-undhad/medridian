"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { slideInLeft, slideInRight } from "@/lib/motion";
import { brand } from "@/data/nav";

const INTEREST_OPTIONS = [
  "Family Portraits",
  "Newborn Session",
  "Maternity Session",
  "Wedding",
  "Engagement",
  "Engagement + Wedding",
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setErrorMessage(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setErrorMessage(
        "Unable to send your inquiry. Please check your internet connection and try again."
      );
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      first_name: (formData.get("firstName") as string) || "",
      last_name: (formData.get("lastName") as string) || "",
      email: (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || "",
      interested_in: selectedInterest || (formData.get("interest") as string) || "",
      session_date: (formData.get("sessionDate") as string) || "",
      budget: (formData.get("budget") as string) || "",
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitted(true);
      setSelectedInterest("");
      form.reset();
    } catch {
      setErrorMessage(
        "Unable to send your inquiry. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="mx-auto max-w-7xl px-6 sm:px-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-12 lg:gap-16">
        {/* Form Column */}
        <Reveal variants={slideInRight} delay={0.1} className="flex flex-col gap-6 sm:gap-8">
          <div>
            <h1 className="font-serif text-heading text-balance tracking-tight text-[var(--color-ink)] uppercase">
              Contact {brand.short}
            </h1>
            <p className="mt-3 sm:mt-4 max-w-md text-body leading-relaxed text-[var(--color-body)] text-pretty">
              I would love to hear about you and your celebration! Please complete the form below, email{" "}
              <a
                href={`mailto:${brand.email}`}
                className="text-[var(--color-accent-ink)] underline underline-offset-2 transition-colors hover:opacity-80"
              >
                {brand.email}
              </a>
              , or reach out at{" "}
              <a
                href={`tel:${brand.phone.replace(/[^0-9+]/g, "")}`}
                className="text-[var(--color-accent-ink)] underline underline-offset-2 transition-colors hover:opacity-80"
              >
                {brand.phone}
              </a>
              .
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
            {/* Name Fields (First Name + Last Name) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="text-xs font-medium tracking-wide text-[var(--color-ink)]">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  className="rounded-lg border border-[var(--color-line)] bg-white/80 px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="text-xs font-medium tracking-wide text-[var(--color-ink)]">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  className="rounded-lg border border-[var(--color-line)] bg-white/80 px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>

            {/* Email and Phone Number Fields (Side by Side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-medium tracking-wide text-[var(--color-ink)]">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="rounded-lg border border-[var(--color-line)] bg-white/80 px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-xs font-medium tracking-wide text-[var(--color-ink)]">
                  Phone number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  minLength={10}
                  placeholder="e.g. 9876543210"
                  title="Please enter a 10-digit phone number"
                  required
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "Delete",
                      "Tab",
                      "Escape",
                      "Enter",
                      "ArrowLeft",
                      "ArrowRight",
                      "Home",
                      "End",
                    ];
                    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
                      return;
                    }
                    if (!/^[0-9]$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10);
                  }}
                  className="rounded-lg border border-[var(--color-line)] bg-white/80 px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>
            </div>

            {/* I'm interested in (Radio options) */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-medium tracking-wide text-[var(--color-ink)]">
                I&apos;m interested in <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-col gap-2 pl-1">
                {INTEREST_OPTIONS.map((option) => {
                  const optionId = `interest-${option.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
                  return (
                    <label
                      key={option}
                      htmlFor={optionId}
                      className="group inline-flex w-fit items-center gap-3 cursor-pointer text-xs sm:text-sm text-[var(--color-body)] transition-colors hover:text-[var(--color-ink)]"
                    >
                      <input
                        id={optionId}
                        type="radio"
                        name="interest"
                        value={option}
                        required
                        checked={selectedInterest === option}
                        onChange={(e) => setSelectedInterest(e.target.value)}
                        className="h-4 w-4 accent-[var(--color-ink)] cursor-pointer text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Date of Session Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="sessionDate" className="text-xs font-medium tracking-wide text-[var(--color-ink)]">
                Date of Session <span className="text-rose-500">*</span>
                <span className="ml-2 text-[11px] font-normal text-[var(--color-muted)]">
                  Subject to Photographer availability
                </span>
              </label>
              <input
                id="sessionDate"
                name="sessionDate"
                type="date"
                required
                className="rounded-lg border border-[var(--color-line)] bg-white/80 px-4 py-2.5 text-sm text-[var(--color-ink)] outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] sm:w-2/3"
              />
            </div>

            {/* Photography Budget Field (Strictly Numerical) */}
            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-xs font-medium tracking-wide text-[var(--color-ink)]">
                Photography Budget (₹ INR) <span className="text-rose-500">*</span>
              </label>
              <div className="relative w-full sm:w-2/3">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-[var(--color-muted)] select-none">
                  ₹
                </span>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  min="0"
                  placeholder="50000"
                  title="Please enter numbers only"
                  required
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "Delete",
                      "Tab",
                      "Escape",
                      "Enter",
                      "ArrowLeft",
                      "ArrowRight",
                      "Home",
                      "End",
                    ];
                    if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
                      return;
                    }
                    if (!/^[0-9]$/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedData = e.clipboardData.getData("text");
                    const cleanNumbers = pastedData.replace(/[^0-9]/g, "");
                    if (cleanNumbers) {
                      e.currentTarget.value = cleanNumbers;
                    }
                  }}
                  className="w-full rounded-lg border border-[var(--color-line)] bg-white/80 pl-8 pr-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-ink)] px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-[var(--color-accent-ink)] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : submitted ? "Submitted" : "Submit"}
              </button>
            </div>

            {submitted ? (
              <p className="text-body text-[var(--color-accent-ink)]" role="status">
                Thank you — we&apos;ll be in touch shortly regarding your session!
              </p>
            ) : null}

            {errorMessage ? (
              <p className="text-xs sm:text-sm text-rose-500 font-medium" role="alert">
                {errorMessage}
              </p>
            ) : null}
          </form>
        </Reveal>

        {/* Right Photo Column */}
        <Reveal
          variants={slideInLeft}
          className="sticky top-28 w-full"
        >
          <div className="relative min-h-[360px] sm:min-h-[460px] md:min-h-[700px] lg:min-h-[760px] w-full overflow-hidden rounded-sm">
            <Image
              src="/image/about_home/1.png"
              alt="Portrait of Ravi Barvaliya, lead photographer and founder of Dream Stories"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
