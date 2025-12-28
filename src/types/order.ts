export interface OrderItemVm {
  id: number;
  productId: number;
  productName: string;
  productImage: string | null;
  productPrice: number;
  productPriceString: string;
  quantity: number;
  shippedQuantity: number;
  taxAmount: number;
  taxAmountString: string;
  discountAmount: number;
  discountAmountString: string;
  total: number;
  totalString: string;
  rowTotal: number;
  rowTotalString: string;
  variationOptions: string[];
}

export interface ShippingAddressVm {
  contactName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  districtName: string | null;
  zipCode: string;
  stateOrProvinceName: string;
  cityName: string;
  countryName: string | null;
}

export interface OrderDetailVm {
  id: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  createdOn: string;
  orderStatusString: string;
  orderStatus: number;
  shippingMethod: string;
  paymentMethod: string;
  
  // Numerical values
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  orderTotal: number;
  
  // Formatted Strings (Use these for display)
  subtotalString: string;
  discountAmountString: string;
  taxAmountString: string;
  shippingAmountString: string;
  orderTotalString: string;
  
  shippingAddress: ShippingAddressVm;
  orderItems: OrderItemVm[];
  orderNote: string | null;
  isMasterOrder: boolean;
  subOrderIds: number[] | null;
}