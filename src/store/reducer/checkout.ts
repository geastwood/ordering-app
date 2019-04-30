import { StoreActionTypes, CHECKOUT_RECEIVE, CHECKOUT_REMOVE } from '../action'
import { ProductType } from './product'

export type CheckoutDataType = {
  selectedProducts: ProductType[]
  subProductsMap: { [key: string]: ProductType[] }
}

const defaultState: CheckoutDataType = {
  selectedProducts: [],
  subProductsMap: {},
}

export default (
  state: CheckoutDataType = defaultState,
  action: StoreActionTypes
): CheckoutDataType => {
  switch (action.type) {
    case CHECKOUT_RECEIVE:
      return action.checkout
    case CHECKOUT_REMOVE:
      return defaultState
    default:
      return state
  }
}
