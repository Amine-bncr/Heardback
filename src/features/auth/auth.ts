import { supabase } from '../../lib/supabase'
import { BRAND } from '../../shared/brand'

// Identity scopes only. Inbox access is a separate "Connect inbox" flow in M2
// through the oauth-callback Edge Function, after the in-app consent screen.
export const IDENTITY_SCOPES = ['openid', 'email', 'profile'] as const

export function getRedirectUri(): string {
  // Vite exposes PUBLIC_ vars to the client; this is a public URL, not a secret.
  const base = (import.meta.env.VITE_PUBLIC_APP_URL as string) ?? window.location.origin
  return `${base}/auth/callback`
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: IDENTITY_SCOPES.join(' '),
      redirectTo: getRedirectUri(),
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  })
  if (error) throw error
}

export async function signInWithMicrosoft() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
    options: {
      scopes: IDENTITY_SCOPES.join(' '),
      redirectTo: getRedirectUri(),
    },
  })
  if (error) throw error
}

export const APP_NAME = BRAND.name