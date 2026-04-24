import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const AVATAR_BUCKET = process.env.SUPABASE_AVATAR_BUCKET ?? 'avatars'

export function isSupabaseStorageConfigured() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey)
}

export function createSupabaseServerClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Supabase Storage is not configured')
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
