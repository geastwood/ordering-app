import { CLIENT_RECEIVE, StoreActionTypes, CLIENT_REMOVE } from '../action'

export type ClientType = {
  status: 'success' | 'fail' | 'uninitialized'
  displayName: string
  userId: string
  loginToken: string
  parentMerchantId: string
}

const defaultState: ClientType = {
  status: 'uninitialized',
  displayName: '',
  userId: '',
  loginToken: '',
  parentMerchantId: '',
}

export default (state: ClientType = defaultState, action: StoreActionTypes) => {
  switch (action.type) {
    case CLIENT_RECEIVE:
      return action.payload
    case CLIENT_REMOVE:
      return defaultState
    default:
      return state
  }
}
