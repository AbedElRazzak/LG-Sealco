export interface AddToCartRequest {
  productId: number;
  variationName?: string;
  quantity: number;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface CartDetails {
  customerId: number;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
