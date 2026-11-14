// Shared TypeScript types mirroring the Postgres schema in supabase/migrations.
// Used by both the client and Edge Functions so types never drift.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Provider = 'google' | 'microsoft'

export type ApplicationStatus =
  | 'Pending'
  | 'Assessment'
  | 'Interview'
  | 'Offer'
  | 'Accepted'
  | 'Rejected'
  | 'Withdrawn'

export interface Profile {
  id: string
  email: string | null
  display_name: string | null
  theme: 'light' | 'dark' | 'system'
  created_at: string
}

// Client-facing view of a connected account. It NEVER contains token columns;
// those live in account_secrets, readable only by Edge Functions (service role).
export interface ConnectedAccount {
  id: string
  user_id: string
  provider: Provider
  provider_email: string | null
  scopes: string[] | null
  is_active: boolean
  last_sync_at: string | null
  created_at: string
}

// Tokens are stored encrypted at rest. This table has RLS enabled but NO client
// policies, so the browser can never read it. Only Edge Functions using the
// service role can access it.
export interface AccountSecret {
  id: string
  account_id: string
  access_token_encrypted: string | null
  refresh_token_encrypted: string | null
  token_expires_at: string | null
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  user_id: string
  company: string
  role: string | null
  date_applied: string | null
  job_board: string | null
  application_id: string | null
  status: ApplicationStatus
  status_pinned: boolean
  confidence: number | null
  needs_review: boolean
  notes: string | null
  created_at: string
  updated_at: string
}

export interface ApplicationEmail {
  id: string
  application_id: string
  provider: Provider
  provider_message_id: string
  provider_thread_id: string | null
  received_at: string | null
  subject: string | null
  snippet: string | null
  classification: Json | null
  deep_link: string | null
  created_at: string
}

export interface StatusHistory {
  id: string
  application_id: string
  from_status: ApplicationStatus | null
  to_status: ApplicationStatus
  source: 'manual' | 'automation'
  created_at: string
}

export interface SyncState {
  id: string
  user_id: string
  provider: Provider
  history_id: string | null
  delta_token: string | null
  last_successful_at: string | null
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  plan: 'free' | 'pro'
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'
  current_period_end: string | null
  created_at: string
  updated_at: string
}

export interface UsageCounter {
  id: string
  user_id: string
  period_start: string
  period_end: string
  emails_analysed: number
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Partial<Profile> & { id: string }
        Update: Partial<Profile>
      }
      connected_accounts: {
        Row: ConnectedAccount
        Insert: Partial<ConnectedAccount> & { user_id: string; provider: Provider }
        Update: Partial<ConnectedAccount>
      }
      account_secrets: {
        Row: AccountSecret
        Insert: Partial<AccountSecret> & { account_id: string }
        Update: Partial<AccountSecret>
      }
      applications: {
        Row: Application
        Insert: Partial<Application> & { user_id: string; company: string }
        Update: Partial<Application>
      }
      application_emails: {
        Row: ApplicationEmail
        Insert: Partial<ApplicationEmail> & { application_id: string }
        Update: Partial<ApplicationEmail>
      }
      status_history: {
        Row: StatusHistory
        Insert: Partial<StatusHistory> & { application_id: string; to_status: ApplicationStatus }
        Update: Partial<StatusHistory>
      }
      sync_state: {
        Row: SyncState
        Insert: Partial<SyncState> & { user_id: string; provider: Provider }
        Update: Partial<SyncState>
      }
      subscriptions: {
        Row: Subscription
        Insert: Partial<Subscription> & { user_id: string }
        Update: Partial<Subscription>
      }
      usage_counters: {
        Row: UsageCounter
        Insert: Partial<UsageCounter> & { user_id: string }
        Update: Partial<UsageCounter>
      }
    }
  }
}