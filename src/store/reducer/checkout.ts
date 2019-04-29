import { StoreActionTypes, CHECKOUT_RECEIVE } from '../action'
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

    default:
      return state
  }
}
