import { CategoryType } from '../store/reducer/category'
import { ProductType } from '../store/reducer/product'

export const ADD_PRODUCT = 'ui/ADD_PRODUCT'
export const ADD_CATEGORY = 'ui/ADD_CATEGORY'

export const addProduct = (payload: {
  price: string
  name: string
  isSubProduct: boolean
  categories: CategoryType[]
  subProducts: ProductType[]
}) => ({
  type: ADD_PRODUCT,
  payload,
})
export const addCategory = (payload: { name: string }) => ({
  type: ADD_CATEGORY,
  payload,
})
