import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jofvvhwtriwvteeasamq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZnZ2aHd0cml3dnRlZWFzYW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2ODYyOTEsImV4cCI6MjA3NzI2MjI5MX0.Q8oRGmaeWoBFDeKF0Jxw1tQjBbUi5TBLyfSA9b1_qs4'
export const supabase = createClient(supabaseUrl, supabaseKey)
