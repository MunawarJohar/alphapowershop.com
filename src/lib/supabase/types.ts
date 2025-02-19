
export interface Order {
  id: string;
  created_at: string;
  name: string;
  email: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  total: number;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}
