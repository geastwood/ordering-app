import * as React from 'react'
import { ProductType } from '../../store/reducer/product'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  withStyles,
  Chip,
} from '@material-ui/core'
import { productRemove } from '../../store/action'
import { connect } from 'react-redux'

type PropTypes = {
  product: ProductType
  onRemove: (product: ProductType) => ReturnType<typeof productRemove>
}

const FullWidthCard = withStyles({
  root: {
    width: '100%',
  },
})(Card)

class ProductCard extends React.PureComponent<PropTypes> {
  handleClick(product: ProductType) {
    const yes = confirm(`确认删除产品"${product.name}"？`)

    if (yes) {
      this.props.onRemove(product)
    }
  }
  render() {
    const { product } = this.props
    return (
      <FullWidthCard>
        <CardContent>
          <Typography variant="h5" component="h2">
            {product.name}
          </Typography>
          <div style={{ paddingTop: 10 }}>
            {product.categories.map(category => (
              <span key={category.id} style={{ paddingRight: 10 }}>
                <Chip color="primary" label={category.name} />
              </span>
            ))}
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => this.handleClick(product)}
          >
            删除
          </Button>
        </CardActions>
      </FullWidthCard>
    )
  }
}

export default connect(
  null,
  { onRemove: productRemove }
)(ProductCard)
