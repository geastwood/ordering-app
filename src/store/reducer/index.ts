import { combineReducers } from 'redux'
import product from './product'
import category from './category'
import checkout from './checkout'

const rootReducer = combineReducers({
  product,
  category,
  checkout,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
