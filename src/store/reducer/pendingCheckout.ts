import {
  StoreActionTypes,
  PENDING_CHECKOUT_RECEIVE,
  PENDING_CHECKOUT_REMOVE,
  MARK_PAID,
} from '../action'

export type PendingCheckoutType = {
  qrCode: null | string
  prepayId: null | string
  paid: boolean
}

const defaultState: PendingCheckoutType = {
  qrCode: null,
  prepayId: null,
  paid: false,
}

export default (
  state: PendingCheckoutType = defaultState,
  action: StoreActionTypes
) => {
  switch (action.type) {
    case PENDING_CHECKOUT_RECEIVE:
      return action.payload
    case MARK_PAID:
      return {
        ...state,
        paid: true,
      }
    case PENDING_CHECKOUT_REMOVE:
      return defaultState
    default:
      return state
  }
}
