export interface AddressItem {
  userAddressId: number;
  contactName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  districtId: number | null;
  districtName: string;
  zipCode: string;
  stateOrProvinceId: number;
  stateOrProvinceName: string;
  cityName: string;
  countryId: number | null;
  countryName: string;
  isDistrictEnabled: boolean;
  isZipCodeEnabled: boolean;
  isCityEnabled: boolean;
}

export interface SelectOption {
  disabled: boolean;
  group: any | null;
  selected: boolean;
  text: string;
  value: string;
}

export interface AddressForm {
  contactName: string | null;
  phone: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  stateOrProvinceId: number;
  districtId: number | null;
  countryId: number | null;
  city: string | null;
  zipCode: string | null;
  stateOrProvinces: SelectOption[];
  districts: SelectOption[] | null;
  shipableContries: SelectOption[];
}

export interface ShippingInfoResponse {
  existingShippingAddresses: AddressItem[];
  shippingAddressId: number;
  billingAddressId: number;
  shippingMethod: string | null;
  newAddressForm: AddressForm;
  useShippingAddressAsBillingAddress: boolean;
  newBillingAddressForm: AddressForm | null;
  orderNote: string | null;
  checkoutId: string; // GUID as string
}

export interface CheckoutRequest {
  couponCode?: string;
}

export interface CheckoutResponse {
  checkoutId: string;
}

export interface PaymentProvider {
  id: string;
  name: string;
  landingViewComponentName: string;
}

export interface UpdateTaxShippingRequest {
  selectedShippingMethodName: string | null;
  newShippingAddress?: Partial<AddressItem>;
  newBillingAddress?: Partial<AddressItem>;
  existingShippingAddressId?: number;
}

export interface ShippingPrice {
  name: string;
  price: number;
  description: string | null;
  priceText: string;
}

export interface CalculatedProductPrice {
  price: number;
  oldPrice: number;
  percentOfSaving: number;
  priceString: string;
  oldPriceString: string;
}

export interface CheckoutItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  calculatedProductPrice: CalculatedProductPrice;
  productPrice: number;
  productPriceString: string;
  productStockQuantity: number;
  productStockTrackingIsEnabled: boolean;
  isProductAvailabeToOrder: boolean;
  quantity: number;
  total: number;
  totalString: string;
  variationOptions: any[]; // You can define a specific interface for options if needed
}

export interface CheckoutVm {
  id: string;
  lockedOnCheckout: boolean;
  couponCode: string | null;
  subTotal: number;
  subTotalString: string;
  discount: number;
  discountString: string;
  couponValidationErrorMessage: string | null;
  isProductPriceIncludeTax: boolean;
  taxAmount: number;
  orderNote: string | null;
  taxAmountString: string;
  shippingAmount: number;
  shippingAmountString: string;
  subTotalWithDiscount: number;
  subTotalWithDiscountWithoutTax: number;
  orderTotal: number;
  orderTotalString: string;
  items: CheckoutItem[];
  isValid: boolean;
}

export interface UpdateTaxShippingResponse {
  isProductPriceIncludedTax: boolean;
  shippingPrices: ShippingPrice[];
  selectedShippingMethodName: string | null;
  checkoutVm: CheckoutVm;
  newShippingAddress?: Partial<AddressItem> | {}; // Allow empty object
  newBillingAddress?: Partial<AddressItem> | {};
}

export interface District {
  id: number;
  name: string;
}

export interface SaveShippingRequest {
  shippingAddressId: number;
  billingAddressId: number;
  shippingMethod: string;
  useShippingAddressAsBillingAddress: boolean;
  checkoutId: string;
  orderNote?: string | null;
  newAddressForm?: Partial<AddressForm> | null;
  newBillingAddressForm?: Partial<AddressForm> | null;
}

export interface SaveShippingResponse {
  success: boolean;
  nextStep: string;
}

export interface OrderCompletionResponse {
  success: boolean;
  orderId: number;
  nextStep: string;
}