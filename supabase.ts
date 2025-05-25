import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  location?: string
  age?: number
  gender?: string
  style_preference?: string
  budget_range?: string
  current_mood?: string
  created_at: string
  updated_at: string
}

export interface UserOutfit {
  id: string
  user_id: string
  name: string
  description?: string
  total_price: number
  original_price: number
  mood?: string
  weather?: string
  occasion?: string
  items: any[]
  image_url?: string
  created_at: string
}

export interface UserAnalytics {
  id: string
  user_id: string
  total_outfits_created: number
  total_money_saved: number
  favorite_mood?: string
  most_shopped_category?: string
  avg_outfit_price: number
  last_activity: string
  created_at: string
  updated_at: string
}

// Auth helper functions
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const storedUser = localStorage.getItem("stylesavvy_user")
  return storedUser ? JSON.parse(storedUser) : null
}

export const setCurrentUser = (user: User) => {
  localStorage.setItem("stylesavvy_user", JSON.stringify(user))
}

export const clearCurrentUser = () => {
  localStorage.removeItem("stylesavvy_user")
}
