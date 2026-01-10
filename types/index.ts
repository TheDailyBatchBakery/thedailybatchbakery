// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  zipcode: string;
  created_at?: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url?: string;
  has_size?: boolean;
  size_options?: ProductSize[];
}

export interface ProductSize {
  value: string;
  label: string;
  price: number;
}

export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  size?: string;
  quantity: number;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';

export type OrderType = 'pickup' | 'delivery';

export type PaymentMethod = 'cash' | 'venmo';

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: OrderStatus;
  order_type: OrderType;
  pickup_date: string;
  pickup_time: string;
  delivery_address?: string;
  delivery_zip?: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: PaymentMethod;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  size?: string;
  quantity: number;
  price: number;
  total: number;
}

// Business Configuration Types
export interface BusinessHours {
  open: string; // HH:mm format
  close: string; // HH:mm format
  time_slot_interval: number; // minutes
  order_cutoff_minutes: number; // minutes before closing
}

export interface BusinessConfig {
  name: string;
  email: string;
  phone: string;
  venmo: string;
  hours: BusinessHours;
  delivery_fee: number;
  free_delivery_threshold: number;
  min_delivery_order: number;
  min_advance_days: number;
  las_vegas_zip_codes: string[];
}

