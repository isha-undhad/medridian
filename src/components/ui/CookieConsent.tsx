"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Languages, X, Check, SlidersHorizontal, ShieldCheck, Info } from "lucide-react";
import PrivacyPolicyModal from "@/components/ui/PrivacyPolicyModal";

const STORAGE_KEY = "cookie-consent-status";
const PREFERENCES_KEY = "cookie-consent-preferences";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
};

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    setMounted(true);
    const storedStatus = localStorage.getItem(STORAGE_KEY);
    const storedPrefs = localStorage.getItem(PREFERENCES_KEY);

    if (storedPrefs) {
      try {
        setPreferences(JSON.parse(storedPrefs));
      } catch {
        // Fallback to default
      }
    }

    // If no previous choice was made, open the banner with a slight smooth delay
    if (!storedStatus) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = useCallback((status: "accepted" | "rejected" | "custom", prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, status);
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
      window.dispatchEvent(new CustomEvent("cookie_consent_change", { detail: { status, prefs } }));
    } catch {
      // Ignore localStorage errors
    }
    setPreferences(prefs);
    setIsOpen(false);
    setIsPreferencesOpen(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent("accepted", allAccepted);
  }, [saveConsent]);

  const handleRejectAll = useCallback(() => {
    const allRejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent("rejected", allRejected);
  }, [saveConsent]);

  const handleSaveCustom = useCallback(() => {
    saveConsent("custom", preferences);
  }, [saveConsent, preferences]);

  // Avoid hydration markup mismatch
  if (!mounted) return null;

  return (
    <>
      {/* Eventbrite-Style Bottom-Left Cookie Banner */}
      <AnimatePresence>
        {isOpen && !isPreferencesOpen && (
          <motion.div
            role="region"
            aria-label="Cookie consent banner"
            aria-live="polite"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-50 w-auto sm:w-[480px] md:w-[520px] max-w-[calc(100vw-2rem)] rounded-2xl border border-[var(--color-line)] bg-[#FAF8F5]/98 text-[var(--color-ink)] shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-md overflow-hidden"
          >
            {/* Main Content Area */}
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-between gap-5">
                {/* Text Content */}
                <div className="flex-1 pr-0 sm:pr-2">
                  <h2 className="font-serif text-base sm:text-lg font-semibold text-[var(--color-ink)] tracking-tight">
                    We use cookies
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-body)]">
                    Our website uses cookies to personalize and improve your experience, perform analytics, and to show you more relevant advertisements.
                  </p>
                  <p className="mt-2.5 text-xs leading-relaxed text-[var(--color-body)]">
                    Manage your preferences using the options in this banner and learn more in our{" "}
                    <button
                      type="button"
                      onClick={() => setIsPrivacyOpen(true)}
                      className="underline font-medium text-[var(--color-accent-ink)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
                    >
                      Cookie Statement
                    </button>
                    .
                  </p>
                </div>

                {/* 3-Button Action Stack (Eventbrite-style) */}
                <div className="shrink-0 flex flex-col gap-2 w-full sm:w-36 justify-center">
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    aria-label="Accept all cookies"
                    className="w-full rounded-full bg-[#D1410C] hover:bg-[#B8380A] text-white py-2 px-4 text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm active:scale-98 cursor-pointer text-center"
                  >
                    Accept all
                  </button>

                  <button
                    type="button"
                    onClick={handleRejectAll}
                    aria-label="Reject non-essential cookies"
                    className="w-full rounded-full bg-[#545E75] hover:bg-[#454E63] text-white py-2 px-4 text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm active:scale-98 cursor-pointer text-center"
                  >
                    Reject all
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPreferencesOpen(true)}
                    aria-label="More cookie choices and granular settings"
                    className="w-full rounded-full bg-[#394050] hover:bg-[#2C3240] text-white py-2 px-4 text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm active:scale-98 cursor-pointer text-center"
                  >
                    More choices
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)]/80 px-5 py-2.5 flex items-center justify-between text-[11px] text-[var(--color-muted)]">
              <div className="flex items-center gap-1.5" title="Cookie Management">
                <Cookie className="h-3.5 w-3.5 text-[var(--color-muted)]" />
              </div>

              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-[var(--color-ink)] hover:underline transition-colors cursor-pointer"
              >
                See our privacy policy
              </button>

              <div className="flex items-center gap-1.5" title="Language & Accessibility">
                <Languages className="h-3.5 w-3.5 text-[var(--color-muted)]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Granular Cookie Preferences Modal ("More Choices") */}
      <AnimatePresence>
        {isPreferencesOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreferencesOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col w-full max-w-xl my-auto max-h-[90vh] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg)] text-[var(--color-ink)] shadow-2xl z-10"
            >
              {/* Modal Header */}
              <div className="border-b border-[var(--color-line)] px-6 py-4.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-[var(--color-accent-ink)]">
                    <SlidersHorizontal className="h-4 w-4" />
                  </div>
                  <div>
                    <h2
                      id="cookie-preferences-title"
                      className="font-serif text-lg font-semibold text-[var(--color-ink)]"
                    >
                      Cookie Preferences
                    </h2>
                    <p className="text-[11px] text-[var(--color-muted)]">
                      Customize how we use cookies on this site
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPreferencesOpen(false)}
                  aria-label="Close preferences"
                  className="rounded-full p-1.5 text-[var(--color-muted)] hover:bg-[var(--color-line)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Preferences List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
                {/* 1. Necessary Cookies */}
                <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-sm text-[var(--color-ink)]">
                        Strictly Necessary Cookies
                      </span>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-500/20 shrink-0">
                      Always Active
                    </span>
                  </div>
                  <p className="mt-2 text-body leading-relaxed text-[var(--color-muted)]">
                    Essential for the website to function securely, enable page navigation, and remember your privacy and cookie consent settings.
                  </p>
                </div>

                {/* 2. Analytics Cookies */}
                <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-[var(--color-accent-ink)] shrink-0" />
                      <span className="font-semibold text-sm text-[var(--color-ink)]">
                        Analytics & Performance Cookies
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                        }
                        aria-label="Toggle analytics cookies"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[var(--color-line)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-accent-ink)]"></div>
                    </label>
                  </div>
                  <p className="mt-2 text-body leading-relaxed text-[var(--color-muted)]">
                    Help us understand how visitors interact with the portfolio to measure page visits, bounce rates, and traffic sources to continuously improve our showcase.
                  </p>
                </div>

                {/* 3. Marketing Cookies */}
                <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Cookie className="h-4 w-4 text-[#D1410C] shrink-0" />
                      <span className="font-semibold text-sm text-[var(--color-ink)]">
                        Marketing & Personalization Cookies
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) =>
                          setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                        }
                        aria-label="Toggle marketing cookies"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[var(--color-line)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D1410C]"></div>
                    </label>
                  </div>
                  <p className="mt-2 text-body leading-relaxed text-[var(--color-muted)]">
                    Used to provide curated recommendations, relevant workshop updates, and tailored client stories based on your photography interests.
                  </p>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsPrivacyOpen(true)}
                  className="text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)] underline cursor-pointer"
                >
                  Read Privacy Policy
                </button>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="rounded-full border border-[var(--color-line)] px-4 py-2 text-xs font-medium text-[var(--color-muted)] hover:bg-[var(--color-line)]/40 hover:text-[var(--color-ink)] transition-colors cursor-pointer"
                  >
                    Reject Non-Essential
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] text-white px-5 py-2 text-xs font-medium hover:bg-[var(--color-accent-ink)] transition-all duration-300 shadow-sm cursor-pointer active:scale-98"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Save Choices
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal Integration */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
}
