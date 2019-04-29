import * as React from 'react'
import { ProductType } from '../../store/reducer/product'
import { List, ListItem, FormControlLabel, Checkbox } from '@material-ui/core'

type PropTypes = {
  products: ProductType[]
  selectedProducts: ProductType[]
  onSelect: (product: ProductType) => void
}

class ProductSelectList extends React.PureComponent<PropTypes> {
  render() {
    const { products, selectedProducts, onSelect } = this.props
    const selectedIds = selectedProducts.map(({ id }) => id)
    return (
      <ul style={{ paddingLeft: '5px' }}>
        {products.map(product => (
          <li key={product.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedIds.includes(product.id)}
                  onChange={() => onSelect(product)}
                  value={product.id}
                />
              }
              label={product.name}
            />
          </li>
        ))}
      </ul>
    )
  }
}

export default ProductSelectList
