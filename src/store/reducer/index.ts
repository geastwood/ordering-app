import { combineReducers } from 'redux'
import product from './product'
import category from './category'
import checkout from './checkout'
import pendingCheckout from './pendingCheckout'
import client from './client'

const rootReducer = combineReducers({
  client,
  product,
  category,
  checkout,
  pendingCheckout,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
