export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderData {
  items: CartItem[];
  customerName: string;
  orderType: 'dine-in' | 'delivery';
  tableNumber?: string;
  whatsappNumber?: string;
  address?: string;
  references?: string;
  comments?: string;
  total: number;
}

export type Category = 'hamburguesas' | 'hotdogs' | 'bebidas' | 'acompanantes' | 'promociones';

export const CATEGORIES: Array<{ id: Category; name: string; icon: string }> = [
  { id: 'hamburguesas', name: 'Hamburguesas', icon: '🍔' },
  { id: 'hotdogs', name: 'Hot Dogs', icon: '🌭' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
  { id: 'acompanantes', name: 'Acompañantes', icon: '🍟' },
  { id: 'promociones', name: 'Promociones', icon: '🎉' },
];