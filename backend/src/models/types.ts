export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface Supplier {
  id: number;
  name: string;
  contact_info?: string;
  rating: number;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  category?: string;
  price: number;
  cost: number;
  supplier_id?: number;
  image_url?: string;
  created_at: string;
}

export interface Competitor {
  id: number;
  name: string;
  website_url: string;
  tracked_products_count: number;
  created_at: string;
}

export interface AdCampaign {
  id: number;
  product_id?: number;
  platform: string;
  status: string;
  budget: number;
  spend: number;
  revenue: number;
  created_at: string;
}

export interface Trend {
  id: number;
  name: string;
  description?: string;
  growth_score: number;
  source?: string;
  created_at: string;
}

export interface ProfitCalculation {
  id: number;
  product_id?: number;
  user_id?: number;
  price: number;
  cost: number;
  shipping: number;
  ad_spend: number;
  net_profit: number;
  created_at: string;
}

export interface ContentCalendarEntry {
  id: number;
  user_id?: number;
  title: string;
  description?: string;
  scheduled_at: string;
  platform: string;
  created_at: string;
}
