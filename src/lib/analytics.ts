type AnalyticsValue = string | number | boolean | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, AnalyticsValue>
    ) => void;
    fbq?: (
      command: "track",
      eventName: string,
      parameters?: Record<string, AnalyticsValue>
    ) => void;
  }
}

const META_STANDARD_EVENTS: Record<string, string> = {
  select_item: "ViewContent",
  begin_checkout: "InitiateCheckout",
  generate_lead: "Lead",
  add_payment_info: "AddPaymentInfo",
  contact_click: "Contact"
};

export function trackEvent(
  eventName: string,
  parameters: Record<string, AnalyticsValue> = {}
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, parameters);

  const metaEventName = META_STANDARD_EVENTS[eventName];
  if (metaEventName) {
    window.fbq?.("track", metaEventName, parameters);
  }
}
