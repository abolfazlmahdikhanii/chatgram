import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://apnjyiakjnkychmuphuc.supabase.co"
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbmp5aWFram5reWNobXVwaHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzODAxODYsImV4cCI6MjAzMTk1NjE4Nn0.o9uUzsCL555Zb7rB_o_cveEtw7r8sMzQTMW9My__Wqo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)