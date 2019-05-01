import { AppState } from './reducer/index'
import { RouteComponentProps } from 'react-router'

export const getProducts = (
  state: AppState,
  ownProps: {} & RouteComponentProps<any>
) => ({
  products: state.product,
  hasCategories: state.category.length > 0,
  product: state.product.find(({ id }) => ownProps.match.params.id === id) || {
    price: '',
    isSubProduct: false,
    toAddSubProducts: false,
    name: '',
    categories: [],
    subProducts: [],
  },
})
export const getCategories = (state: AppState) => ({
  categories: state.category,
})

export const getOrderBook = (state: AppState) => {
  const { products } = getProducts(state)
  const data = products.reduce((carry, product) => {
    const categories = product.categories

    categories.forEach(category => {
      if (carry[category.name]) {
        carry[category.name] = carry[category.name].concat(product)
      } else {
        carry[category.name] = [product]
      }
    })

    return carry
  }, {})
  return { data, checkout: state.checkout }
}

export const getCheckout = (state: AppState) => ({
  checkout: state.checkout,
  pendingCheckout: state.pendingCheckout,
})

export const getClient = (state: AppState) => ({
  client: state.client,
})

export const getCategoryById = (state: AppState, { match }) => {
  const category = state.category.find(c => c.id === match.params.id)

  return {
    category: category || null,
  }
}
