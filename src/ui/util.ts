import { CheckoutDataType } from '../store/reducer/checkout'

export const calculateCheckAmount = (checkout: CheckoutDataType) => {
  const { selectedProducts, subProductsMap } = checkout
  const sumProducts = selectedProducts.reduce(
    (sum, { price }) => sum + (Number(price) || 0),
    0
  )

  const sumSubProducts = Object.keys(subProductsMap).reduce(
    (prev, curr) =>
      prev +
      subProductsMap[curr].reduce(
        (carry, sub) => carry + (Number(sub.price) || 0),
        0
      ),
    0
  )
  return { sumSubProducts, sumProducts }
}
