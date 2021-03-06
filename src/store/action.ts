import { ProductType } from './reducer/product'
import { CategoryType } from './reducer/category'
import { CheckoutDataType } from './reducer/checkout'
import { PendingCheckoutType } from './reducer/pendingCheckout'
import { ClientType } from './reducer/client'

export interface ProductAddType {
  type: typeof PRODUCT_ADD
  product: ProductType
}

export interface ProductRemoveType {
  type: typeof PRODUCT_REMOVE
  product: ProductType
}

export interface CategoryAddType {
  type: typeof CATEGORY_ADD
  category: CategoryType
}

export interface CategoryRemoveType {
  type: typeof CATEGORY_REMOVE
  category: CategoryType
}

export interface CheckoutReceiveType {
  type: typeof CHECKOUT_RECEIVE
  checkout: CheckoutDataType
}

export interface PendingCheckoutReceiveType {
  type: typeof PENDING_CHECKOUT_RECEIVE
  payload: PendingCheckoutType
}

export interface PendingCheckoutRemoveType {
  type: typeof PENDING_CHECKOUT_REMOVE
}

export interface MarkPaidType {
  type: typeof MARK_PAID
}
export interface ClientReceiveType {
  type: typeof CLIENT_RECEIVE
  payload: ClientType
}
export interface ClientRemoveType {
  type: typeof CLIENT_REMOVE
}

export interface CheckoutRemoveType {
  type: typeof CHECKOUT_REMOVE
}

export const PRODUCT_ADD = 'store/PRODUCT_ADD'
export const PRODUCT_REMOVE = 'store/PRODUCT_REMOVE'
export const CATEGORY_ADD = 'store/CATEGORY_ADD'
export const CATEGORY_REMOVE = 'store/CATEGORY_REMOVE'
export const CHECKOUT_RECEIVE = 'store/CHECKOUT_RECEIVE'
export const PENDING_CHECKOUT_RECEIVE = 'store/PENDING_CHECKOUT_RECEIVE'
export const PENDING_CHECKOUT_REMOVE = 'store/PENDING_CHECKOUT_REMOVE'
export const MARK_PAID = 'store/MARK_PAID'
export const CLIENT_RECEIVE = 'store/CLIENT_RECEIVE'
export const CLIENT_REMOVE = 'store/CLIENT_REMOVE'
export const CHECKOUT_REMOVE = 'store/CHECKOUT_REMOVE'

export const clientReceive = (client: ClientType): ClientReceiveType => ({
  type: CLIENT_RECEIVE,
  payload: client,
})

export const clientRemove = (): ClientRemoveType => ({
  type: CLIENT_REMOVE,
})

export const markPaid = (): MarkPaidType => ({
  type: MARK_PAID,
})

export const productAdd = (product: ProductType) => ({
  type: PRODUCT_ADD,
  product,
})

export const productRemove = (product: ProductType) => ({
  type: PRODUCT_REMOVE,
  product,
})

export const categoryAdd = (category: CategoryType) => ({
  type: CATEGORY_ADD,
  category,
})

export const categoryRemove = (category: CategoryType) => ({
  type: CATEGORY_REMOVE,
  category,
})

export const checkoutReceive = (checkout: CheckoutDataType) => ({
  type: CHECKOUT_RECEIVE,
  checkout,
})

export const checkoutRemove = (): CheckoutRemoveType => ({
  type: CHECKOUT_REMOVE,
})

export const pendingCheckoutReceive = (
  payload: PendingCheckoutType
): PendingCheckoutReceiveType => ({
  type: PENDING_CHECKOUT_RECEIVE,
  payload,
})

export const pendingCheckoutRemove = (): PendingCheckoutRemoveType => ({
  type: PENDING_CHECKOUT_REMOVE,
})

export type StoreActionTypes =
  | ProductAddType
  | ProductRemoveType
  | CategoryAddType
  | CategoryRemoveType
  | CheckoutReceiveType
  | CheckoutRemoveType
  | PendingCheckoutReceiveType
  | PendingCheckoutRemoveType
  | MarkPaidType
  | ClientReceiveType
  | ClientRemoveType
