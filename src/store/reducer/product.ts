import { StoreActionTypes, PRODUCT_ADD } from '../action'
import { CategoryType } from './category'

export type ProductType = {
  id: string
  name: string
  price: string
  isSubProduct: boolean
  categories: CategoryType[]
  subProducts: ProductType[]
  selectedSubProducts: string[]
}

const defaultState: ProductType[] = []

export default (
  state: ProductType[] = defaultState,
  action: StoreActionTypes
): ProductType[] => {
  switch (action.type) {
    case PRODUCT_ADD:
      // only add if `id` doesn't exist
      if (state.find(({ name }) => name === action.product.name)) {
        return state
      }

      return [...state, action.product]

    default:
      return state
  }
}
