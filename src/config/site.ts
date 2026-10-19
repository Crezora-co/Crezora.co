/**
 * Central runtime configuration.
 *
 * Everything here is derived from environment variables or hard product
 * decisions. Nothing in this file invents a capability that does not exist:
 * if an integration is not configured, the UI is expected to say so instead
 * of faking a successful result.
 */

export const SITE = {
  parentBrand: 'CREZORA.CO',
  productName: 'KalaaVerse',
  releaseLabel: 'Early Access',
  /** Where enquiries are delivered. Defaults to the founder-provided address. */
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL || 'crezora.admin@gmail.com').trim(),
  /** Real translation backend. When empty the whole translation engine is disabled. */
  translationEndpoint: (import.meta.env.VITE_TRANSLATION_ENDPOINT || '').trim(),
} as const;

/**
 * Feature flags.
 *
 * These mirror the honest state of the codebase. Toggle a flag only when the
 * underlying capability has been implemented and tested end to end.
 */
export const FEATURES = {
  /** Real translation requires a configured server-side endpoint. */
  translationEngine: SITE.translationEndpoint.length > 0,
  /** No payment provider is integrated. Never present a fake purchase flow. */
  payments: false,
  /** Payments are a prerequisite for a real marketplace. */
  marketplace: false,
  /** There is no authentication backend, so there is no admin console. */
  adminConsole: false,
  /** AI writing assistance is a template engine, not a model. */
  aiAssistant: false,
} as const;

/** True when a concierge contact address has been configured for this build. */
export const hasContactEmail = (): boolean => SITE.contactEmail.length > 0;

/**
 * Build a `mailto:` link for concierge enquiries.
 * Returns an empty string when no contact address is configured so callers can
 * render an honest "not configured" state instead of a broken link.
 */
export function contactMailto(subject: string, body = ''): string {
  if (!hasContactEmail()) return '';
  const params = new URLSearchParams();
  params.set('subject', subject);
  if (body) params.set('body', body);
  return `mailto:${SITE.contactEmail}?${params.toString()}`;
}
