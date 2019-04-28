import * as React from 'react'
import { ProductType } from '../../store/reducer/product'
import {
  Card,
  CardContent,
  Typography,
  withStyles,
  Chip,
} from '@material-ui/core'
import Button from '../presentational/BlockButton'
import DeleteIcon from '@material-ui/icons/Delete'

type PropTypes = {
  product: ProductType
  selectedProducts: ProductType[]
  onRemove: (product: ProductType) => void
  onAdd: (product: ProductType) => void
}

const FullWidthCard = withStyles({
  root: {
    width: '100%',
  },
})(Card)

export default class ProductCard extends React.PureComponent<PropTypes> {
  render() {
    const { product, selectedProducts } = this.props
    const count = selectedProducts.filter(s => s.id === product.id).length
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <div style={{ flex: 1, display: 'flex', width: '80%' }}>
          <Button component="div" onClick={() => this.props.onAdd(product)}>
            <FullWidthCard>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {count ? (
                    <Chip label={`${count}个`} color="secondary" />
                  ) : null}
                  {product.name}
                </Typography>
              </CardContent>
            </FullWidthCard>
          </Button>
        </div>
        <div style={{ alignItems: 'flex-end', width: '20px' }}>
          <DeleteIcon onClick={() => this.props.onRemove(product)} />
        </div>
      </div>
    )
  }
}
