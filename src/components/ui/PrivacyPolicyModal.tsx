"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShieldCheck, Lock, UserCheck, CheckCircle2, AlertCircle, ArrowDown, AlertTriangle } from "lucide-react";
import { MonogramBadge } from "@/components/ui/Logo";
import { privacyPolicyData } from "@/data/privacyPolicy";
import { usePrivacyConsent } from "@/lib/usePrivacyConsent";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

const highlightIcons: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  Lock,
  UserCheck,
};

export default function PrivacyPolicyModal({
  isOpen,
  onClose,
  onAccept,
}: PrivacyPolicyModalProps) {
  const { isAccepted, acceptedDate, acceptPrivacyPolicy } = usePrivacyConsent();
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shakeError, setShakeError] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Hide the Navbar and lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Trigger Navbar hide
    window.dispatchEvent(new CustomEvent("toggle-hide-nav", { detail: true }));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isAccepted || agreedToTerms) {
          setErrorMessage(null);
          onClose();
        } else {
          setErrorMessage("You must accept the Privacy Policy and client terms to proceed.");
          setShakeError(true);
          setTimeout(() => setShakeError(false), 600);
        }
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restore Navbar and scroll on close
      window.dispatchEvent(new CustomEvent("toggle-hide-nav", { detail: false }));
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isAccepted, agreedToTerms, onClose]);

  const attemptClose = useCallback(() => {
    if (isAccepted || agreedToTerms) {
      setErrorMessage(null);
      onClose();
    } else {
      setErrorMessage("You must accept the Privacy Policy and client terms to proceed.");
      setShakeError(true);
      setTimeout(() => setShakeError(false), 600);
    }
  }, [isAccepted, agreedToTerms, onClose]);

  const handleAccept = useCallback(() => {
    acceptPrivacyPolicy();
    setAgreedToTerms(true);
    setErrorMessage(null);
    setShowSuccessToast(true);

    if (onAccept) {
      onAccept();
    }

    // Smoothly close after displaying brief acceptance confirmation
    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 1100);
  }, [acceptPrivacyPolicy, onAccept, onClose]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={attemptClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col w-full max-w-3xl my-auto max-h-[85vh] sm:max-h-[88vh] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] shadow-2xl z-10"
          >
            {/* Header */}
            <div className="relative border-b border-[var(--color-line)] bg-[var(--color-bg)] px-5 sm:px-8 pt-5 sm:pt-6 pb-4 sm:pb-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <MonogramBadge className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 bg-[var(--color-surface)] text-xs sm:text-sm text-[var(--color-ink)] shadow-sm border border-[var(--color-line)]" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-accent-ink)]">
                      Legal & Privacy
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[var(--color-accent)]/15 px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold text-[var(--color-accent-ink)] border border-[var(--color-accent)]/30">
                      v{privacyPolicyData.version}
                    </span>
                  </div>
                  <h2
                    id="privacy-modal-title"
                    className="font-serif text-lg sm:text-2xl md:text-3xl text-[var(--color-ink)] font-semibold tracking-tight mt-1"
                  >
                    {privacyPolicyData.title}
                  </h2>
                  <p className="text-body text-[var(--color-muted)] mt-0.5 sm:mt-1">
                    Last updated: {privacyPolicyData.lastUpdated} • Effective: {privacyPolicyData.effectiveDate}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={attemptClose}
                aria-label="Close Privacy Policy Modal"
                suppressHydrationWarning
                className="group -mr-2 -mt-1 rounded-full p-2 text-[var(--color-muted)] hover:bg-[var(--color-line)]/50 hover:text-[var(--color-ink)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              >
                <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Acceptance Status Banner */}
            {acceptedDate ? (
              <div className="flex items-center gap-2.5 bg-emerald-500/10 px-5 sm:px-8 py-2.5 text-xs text-emerald-800 border-b border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>You accepted this privacy policy on <strong>{acceptedDate}</strong>.</span>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2 bg-amber-500/10 px-5 sm:px-8 py-2 text-xs text-amber-900 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-[var(--color-accent)] shrink-0" />
                  <span>Please review our studio privacy terms and accept below to proceed.</span>
                </div>
                <button
                  type="button"
                  onClick={scrollToBottom}
                  suppressHydrationWarning
                  className="inline-flex items-center gap-1 font-medium hover:underline text-[11px] shrink-0 cursor-pointer"
                >
                  Jump to Accept <ArrowDown className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Scrollable Policy Content */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6 space-y-6 text-body text-[var(--color-body)] leading-relaxed scrollbar-thin scrollbar-thumb-[var(--color-line)]"
            >
              {/* Introduction */}
              <p className="text-body font-light italic text-[var(--color-ink)] border-l-2 border-[var(--color-accent)] pl-3 sm:pl-4 py-1">
                &ldquo;{privacyPolicyData.subtitle}&rdquo;
              </p>

              {/* Summary Highlight Cards */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-1">
                {privacyPolicyData.summaryHighlights.map((item) => {
                  const IconComp = highlightIcons[item.icon] || ShieldCheck;
                  return (
                    <div
                      key={item.title}
                      className="flex flex-col rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3.5 sm:p-4 shadow-sm transition-all duration-300 hover:border-[var(--color-accent)]/50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-[var(--color-accent-ink)]">
                          <IconComp className="h-4 w-4" />
                        </div>
                        <span className="font-serif text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-body text-[var(--color-muted)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <hr className="border-[var(--color-line)] my-3" />

              {/* Policy Sections */}
              <div className="space-y-5 sm:space-y-6">
                {privacyPolicyData.sections.map((section) => (
                  <section key={section.id} className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-serif text-sm sm:text-base md:text-lg font-semibold text-[var(--color-ink)]">
                        {section.title}
                      </h3>
                      {section.badge && (
                        <span className="rounded bg-[var(--color-line)]/60 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium tracking-wide uppercase text-[var(--color-muted)]">
                          {section.badge}
                        </span>
                      )}
                    </div>

                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-body text-[var(--color-body)] leading-relaxed">
                        {paragraph}
                      </p>
                    ))}

                    {section.bulletPoints && section.bulletPoints.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[var(--color-body)] marker:text-[var(--color-accent)]">
                        {section.bulletPoints.map((bullet, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </div>

            {/* Error Message Banner if attempted close without accept */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="bg-rose-500/10 border-t border-rose-500/30 px-5 sm:px-8 py-2.5 flex items-center justify-between text-xs text-rose-800"
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                    <span className="font-medium">{errorMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    suppressHydrationWarning
                    className="text-rose-600 hover:text-rose-800 text-xs font-semibold p-1 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer / Acceptance Actions */}
            <motion.div
              animate={shakeError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.5 }}
              className={`border-t border-[var(--color-line)] bg-[var(--color-surface)] px-5 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 transition-colors ${
                errorMessage ? "border-rose-300 ring-1 ring-rose-400/50" : ""
              }`}
            >
              {/* Checkbox agreement */}
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={agreedToTerms || isAccepted}
                  suppressHydrationWarning
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (e.target.checked) {
                      setErrorMessage(null);
                    }
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-[var(--color-line)] text-[var(--color-ink)] focus:ring-[var(--color-accent)] cursor-pointer accent-[var(--color-ink)]"
                />
                <span className="text-xs text-[var(--color-muted)] group-hover:text-[var(--color-ink)] transition-colors leading-tight">
                  I have read and agree to the <strong>Privacy Policy</strong> and client data terms.
                </span>
              </label>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                <button
                  type="button"
                  onClick={attemptClose}
                  suppressHydrationWarning
                  className="flex-1 sm:flex-initial rounded-full border border-[var(--color-line)] px-4 sm:px-5 py-2.5 text-xs font-medium text-[var(--color-muted)] hover:bg-[var(--color-line)]/40 hover:text-[var(--color-ink)] transition-all duration-300 cursor-pointer"
                >
                  {acceptedDate ? "Close" : "Decline"}
                </button>

                <button
                  type="button"
                  onClick={handleAccept}
                  disabled={showSuccessToast}
                  suppressHydrationWarning
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full px-5 sm:px-6 py-2.5 text-xs font-medium tracking-wide shadow-md transition-all duration-300 bg-[var(--color-ink)] text-[var(--color-bg)] hover:bg-[var(--color-accent-ink)] cursor-pointer hover:shadow-lg active:scale-98"
                >
                  <Check className="h-4 w-4" />
                  <span>{acceptedDate ? "Re-Accept & Save" : "Accept Policy"}</span>
                </button>
              </div>
            </motion.div>

            {/* Success Toast Overlay */}
            <AnimatePresence>
              {showSuccessToast && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-x-4 bottom-20 z-20 mx-auto max-w-md rounded-xl bg-emerald-900 text-white px-5 py-3.5 shadow-2xl border border-emerald-700 flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-body font-semibold">Privacy Policy Accepted</p>
                    <p className="text-body text-emerald-200">
                      Your preferences have been saved. Thank you!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
