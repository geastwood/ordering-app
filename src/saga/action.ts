export const ADD_PRODUCT = 'ui/ADD_PRODUCT'
export const ADD_CATEGORY = 'ui/ADD_CATEGORY'

export const addProduct = (payload: { price: string; name: string }) => ({
  type: ADD_PRODUCT,
  payload,
})
export const addCategory = (payload: { name: string }) => ({
  type: ADD_CATEGORY,
  payload,
})
