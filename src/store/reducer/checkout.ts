import { StoreActionTypes, CHECKOUT_RECEIVE } from '../action'
import { ProductType } from './product'

export type CheckoutDataType = ProductType[]

const defaultState: ProductType[] = []

export default (
  state: ProductType[] = defaultState,
  action: StoreActionTypes
): ProductType[] => {
  switch (action.type) {
    case CHECKOUT_RECEIVE:
      return action.checkout

    default:
      return state
  }
}
