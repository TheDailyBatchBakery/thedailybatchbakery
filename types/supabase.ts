// Supabase Database Types
// This will be generated from your Supabase schema
// For now, we'll use a basic structure

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          zipcode: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          zipcode: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          zipcode?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string
          status: string
          order_type: string
          pickup_date: string
          pickup_time: string
          delivery_address: string | null
          delivery_zip: string | null
          subtotal: number
          delivery_fee: number
          total: number
          payment_method: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          user_id: string
          status?: string
          order_type: string
          pickup_date: string
          pickup_time: string
          delivery_address?: string | null
          delivery_zip?: string | null
          subtotal: number
          delivery_fee: number
          total: number
          payment_method: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string
          status?: string
          order_type?: string
          pickup_date?: string
          pickup_time?: string
          delivery_address?: string | null
          delivery_zip?: string | null
          subtotal?: number
          delivery_fee?: number
          total?: number
          payment_method?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_name: string
          size: string | null
          quantity: number
          price: number
          total: number
        }
        Insert: {
          id?: string
          order_id: string
          product_name: string
          size?: string | null
          quantity: number
          price: number
          total: number
        }
        Update: {
          id?: string
          order_id?: string
          product_name?: string
          size?: string | null
          quantity?: number
          price?: number
          total?: number
        }
      }
      products: {
        Row: {
          id: string
          name: string
          price: number
          category: string
          description: string | null
          image_url: string | null
          has_size: boolean
          size_options: Json | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          category: string
          description?: string | null
          image_url?: string | null
          has_size?: boolean
          size_options?: Json | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          category?: string
          description?: string | null
          image_url?: string | null
          has_size?: boolean
          size_options?: Json | null
          active?: boolean
          updated_at?: string
        }
      }
    }
  }
}

