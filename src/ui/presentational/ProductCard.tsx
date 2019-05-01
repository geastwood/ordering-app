import * as React from 'react'
import { ProductType } from '../../store/reducer/product'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  withStyles,
  Chip,
  Grid,
} from '@material-ui/core'
import { productRemove } from '../../store/action'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Button from '../presentational/BlockButton'

type PropTypes = {
  product: ProductType
  onRemove: (product: ProductType) => ReturnType<typeof productRemove>
}

const FullWidthCard = withStyles({
  root: {
    width: '100%',
  },
})(Card)

class ProductCard extends React.PureComponent<
  PropTypes & RouteComponentProps<any>
> {
  handleDelete = (product: ProductType) => {
    const yes = confirm(`确认删除产品"${product.name}"？`)

    if (yes) {
      this.props.onRemove(product)
    }
  }

  handleEdit = (product: ProductType) => {
    if (product.id) {
      this.props.history.push(`product/edit/${product.id}`)
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
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => this.handleDelete(product)}
              >
                删除
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => this.handleEdit(product)}
              >
                修改
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </FullWidthCard>
    )
  }
}

export default compose(
  withRouter,
  connect(
    null,
    { onRemove: productRemove }
  )
)(ProductCard)
