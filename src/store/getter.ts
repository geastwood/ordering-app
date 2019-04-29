import { AppState } from './reducer/index'

export const getProducts = (state: AppState) => ({ products: state.product })
export const getCategories = (state: AppState) => ({
  categories: state.category,
})

const dummyData = [
  {
    price: '1',
    name: '第一个产品',
    id: 'be939938-3009-4e14-8992-f1f948d7ed5c',
    categories: [
      {
        name: 'c1',
        id: 1,
      },
    ],
    subProducts: [],
  },
  {
    price: '2',
    name: '第二个产品',
    id: '6807c0fe-cbcc-483d-ac30-d3e7ff5aeff1',
    categories: [
      {
        name: 'c2',
        id: 2,
      },
    ],
    subProducts: [],
  },
  {
    price: '3',
    name: '第3个产品',
    id: '6808c0fe-cbcc-483d-ac30-d3e7ff5aeff1',
    categories: [{ name: 'c3', id: 3 }],
    subProducts: [],
  },
]

export const getOrderBook = (state: AppState) => {
  const { products } = getProducts(state)
  const data = products.reduce((carry, product) => {
    const categories = product.categories

    console.log(categories)
    categories.forEach(category => {
      if (carry[category.name]) {
        carry[category.name] = carry[category.name].concat(product)
      } else {
        carry[category.name] = [product]
      }
    })

    return carry
  }, {})
  return { data }
}
