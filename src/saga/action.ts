import { CategoryType } from '../store/reducer/category'
import { ProductType } from '../store/reducer/product'
import { CheckoutDataType } from '../store/reducer/checkout'

export const ADD_PRODUCT = 'ui/ADD_PRODUCT'
export const ADD_CATEGORY = 'ui/ADD_CATEGORY'
export const CHECKOUT = 'ui/CHECKOUT'
export const POLL_CHECKOUT_STATUS = 'ui/POLL_CHECKOUT_STATUS'
export const RESET_CHECKOUT = 'ui/RESET_CHECKOUT'
export const LOGIN = 'ui/login'
export const LOGOUT = 'ui/logout'

export const login = (username: string, password: string) => ({
  type: LOGIN,
  payload: { username, password },
})

export const logout = () => ({
  type: LOGOUT,
})

export const addProduct = (payload: {
  price: string
  name: string
  isSubProduct: boolean
  categories: CategoryType[]
  subProducts: ProductType[]
}) => ({
  type: ADD_PRODUCT,
  payload,
})
export const addCategory = (payload: { name: string }) => ({
  type: ADD_CATEGORY,
  payload,
})

export const checkout = () => ({
  type: CHECKOUT,
})

export const pollCheckoutStatus = (prepayId: string) => ({
  type: POLL_CHECKOUT_STATUS,
  payload: prepayId,
})

export const resetCheckout = () => ({
  type: RESET_CHECKOUT,
})
