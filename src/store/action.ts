import { ProductType } from './reducer/product'
import { CategoryType } from './reducer/category'
import { CheckoutDataType } from './reducer/checkout'

export interface ProductAddType {
  type: typeof PRODUCT_ADD
  product: ProductType
}

export interface CategoryAddType {
  type: typeof CATEGORY_ADD
  category: CategoryType
}

export interface CheckoutReceiveType {
  type: typeof CHECKOUT_RECEIVE
  checkout: CheckoutDataType
}

export const PRODUCT_ADD = 'store/PRODUCT_ADD'
export const CATEGORY_ADD = 'store/CATEGORY_ADD'
export const CHECKOUT_RECEIVE = 'store/CHECKOUT_RECEIVE'

export const productAdd = (product: ProductType) => ({
  type: PRODUCT_ADD,
  product,
})

export const categoryAdd = (category: CategoryType) => ({
  type: CATEGORY_ADD,
  category,
})

export const checkoutReceive = (checkout: CheckoutDataType) => ({
  type: CHECKOUT_RECEIVE,
  checkout,
})

export type StoreActionTypes =
  | ProductAddType
  | CategoryAddType
  | CheckoutReceiveType
