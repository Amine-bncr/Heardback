// Single source of truth for the brand. Rename here if the product ever changes name.
export const BRAND = {
  name: 'Hearback',
  tagline: 'Know where every application stands.',
  privacyPromise: 'Read-only. We never send, delete or change your email.',
} as const;

export const BRAND_NAME = BRAND.name;