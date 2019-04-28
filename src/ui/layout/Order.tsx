import * as React from 'react'
import SimpleNavigation from './SimpleNavigation'
import { getOrderBook } from '../../store/getter'
import { connect } from 'react-redux'
import { Grid, Button, ListItem, Link } from '@material-ui/core'
import Scrollspy from 'react-scrollspy'
import { ProductType } from '../../store/reducer/product'
import OrderProductCard from '../presentational/OrderProductCard'
import BlockButton from '../presentational/BlockButton'

type PropTypes = {
  data: { [key: string]: ProductType[] }
}

type StateTypes = {
  selectedProducts: ProductType[]
}

class OrderBook extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    selectedProducts: [],
  }

  removeProduct = (product: ProductType) => {
    const updateProducts = this.state.selectedProducts.filter(
      p => p.id !== product.id
    )
    this.setState({
      selectedProducts: updateProducts,
    })
  }

  addProduct = (product: ProductType) => {
    this.setState({
      selectedProducts: [...this.state.selectedProducts, product],
    })
  }

  render() {
    const { data } = this.props
    return (
      <SimpleNavigation title="下单" rightAction={null}>
        <Grid container>
          <Grid item xs={3}>
            <div style={{ position: 'fixed', marginTop: '4rem' }}>
              <Scrollspy
                items={Object.keys(data)}
                currentClassName="is-current"
              >
                {Object.keys(this.props.data).map(categoryName => (
                  <li key={categoryName}>
                    <Button>
                      <a className="button" href={`#${categoryName}`}>
                        {categoryName}
                      </a>
                    </Button>
                  </li>
                ))}
              </Scrollspy>
            </div>
          </Grid>
          <Grid item xs={9}>
            {Object.keys(this.props.data).map(categoryName => (
              <section key={categoryName} id={categoryName}>
                {this.props.data[categoryName].map(product => (
                  <ListItem>
                    <OrderProductCard
                      selectedProducts={this.state.selectedProducts}
                      product={product}
                      onAdd={this.addProduct}
                      onRemove={this.removeProduct}
                    />
                  </ListItem>
                ))}
              </section>
            ))}
          </Grid>
        </Grid>
        <div style={{ width: '95%', position: 'fixed', bottom: '1rem' }}>
          <BlockButton
            variant="outlined"
            size="large"
            color="primary"
            onClick={() => alert('fei')}
          >
            结账 ({this.state.selectedProducts.length})
          </BlockButton>
        </div>
      </SimpleNavigation>
    )
  }
}

export default connect(getOrderBook)(OrderBook)
