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

type PropTypes = {
  product: ProductType
}

const FullWidthCard = withStyles({
  root: {
    width: '100%',
  },
})(Card)

export default class ProductCard extends React.PureComponent<PropTypes> {
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
          <Button variant="outlined" size="small">
            修改
          </Button>
        </CardActions>
      </FullWidthCard>
    )
  }
}
