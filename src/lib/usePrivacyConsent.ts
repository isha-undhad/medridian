import { useSyncExternalStore, useCallback } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener("meridian_privacy_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("meridian_privacy_change", callback);
  };
}

export function usePrivacyConsent() {
  const isAccepted = useSyncExternalStore(
    subscribe,
    () => (typeof window !== "undefined" ? localStorage.getItem("meridian_privacy_accepted") === "true" : false),
    () => false
  );

  const acceptedDate = useSyncExternalStore(
    subscribe,
    () => (typeof window !== "undefined" ? localStorage.getItem("meridian_privacy_accepted_at") || null : null),
    () => null
  );

  const acceptPrivacyPolicy = useCallback(() => {
    if (typeof window === "undefined") return "";

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    localStorage.setItem("meridian_privacy_accepted", "true");
    localStorage.setItem("meridian_privacy_accepted_at", formattedDate);
    window.dispatchEvent(new Event("meridian_privacy_change"));
    return formattedDate;
  }, []);

  return { isAccepted, acceptedDate, acceptPrivacyPolicy };
}
