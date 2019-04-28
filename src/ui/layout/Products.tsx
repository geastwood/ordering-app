import * as React from 'react'
import Container from '../presentational/Container'
import SimpleNavigation from './SimpleNavigation'
import AddButton from '../presentational/AddButton'
import { ProductType } from '../../store/reducer/product'
import { List, ListItem } from '@material-ui/core'
import { getProducts } from '../../store/getter'
import { connect } from 'react-redux'
import ProductCard from '../presentational/ProductCard'

type PropTypes = {
  products: ProductType[]
}

class Products extends React.PureComponent<PropTypes> {
  render() {
    const { products } = this.props
    return (
      <Container>
        <SimpleNavigation
          title="产品目录"
          rightAction={props => (
            <AddButton onClick={() => props.history.push('/product/add')} />
          )}
        >
          <List>
            {products.map(product => (
              <ListItem key={product.id}>
                <ProductCard product={product} />
              </ListItem>
            ))}
          </List>
        </SimpleNavigation>
      </Container>
    )
  }
}

const ConnectedProducts = connect(getProducts)(Products)

export default ConnectedProducts
