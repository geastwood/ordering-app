import {
  StoreActionTypes,
  PRODUCT_ADD,
  CATEGORY_REMOVE,
  PRODUCT_REMOVE,
} from '../action'
import category, { CategoryType } from './category'

export type ProductType = {
  id: string
  name: string
  price: string
  isSubProduct: boolean
  categories: CategoryType[]
  subProducts: ProductType[]
}

const defaultState: ProductType[] = []

export default (
  state: ProductType[] = defaultState,
  action: StoreActionTypes
): ProductType[] => {
  switch (action.type) {
    case PRODUCT_ADD:
      // if exist
      if (state.find(({ id }) => id === action.product.id)) {
        return state.map(product => {
          if (product.id === action.product.id) {
            return { ...product, ...action.product }
          }
          return product
        })
      }

      return [...state, action.product]

    case PRODUCT_REMOVE:
      return state.reduce((list, product) => {
        if (product.id === action.product.id) {
          return list
        }

        return list.concat({
          ...product,
          subProducts: product.subProducts.filter(
            sub => sub.id !== action.product.id
          ),
        })
      }, [])

    case CATEGORY_REMOVE:
      return state.map(product => {
        return {
          ...product,
          categories: product.categories.filter(
            c => c.id !== action.category.id
          ),
          subProducts: product.subProducts.map(subProject => {
            return {
              ...subProject,
              categories: subProject.categories.filter(
                c => c.id !== action.category.id
              ),
            }
          }),
        }
      })
    default:
      return state
  }
}
