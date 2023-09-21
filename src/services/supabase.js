
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://srxjhuqpxqfrowinlphx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyeGpodXFweHFmcm93aW5scGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMjc0ODUsImV4cCI6MjAxMDgwMzQ4NX0.epGkxYZSjn55qgY3dM3ODAQ6vmTHmPJMhDAfyEm68VI'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase