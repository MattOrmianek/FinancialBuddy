import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://jmmilxswbwlwpiqubzly.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
