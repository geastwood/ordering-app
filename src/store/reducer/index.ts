import { combineReducers } from 'redux'
import product from './product'
import category from './category'
import checkout from './checkout'
import pendingCheckout from './pendingCheckout'

const rootReducer = combineReducers({
  product,
  category,
  checkout,
  pendingCheckout,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
