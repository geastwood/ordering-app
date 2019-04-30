import * as React from 'react'
import SimpleNavigation from './SimpleNavigation'
import { getOrderBook } from '../../store/getter'
import { connect } from 'react-redux'
import { Grid, Button, ListItem } from '@material-ui/core'
import Scrollspy from 'react-scrollspy'
import { ProductType } from '../../store/reducer/product'
import OrderProductCard from '../presentational/OrderProductCard'
import BlockButton from '../presentational/BlockButton'
import { isEmpty } from 'lodash'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Container from '../presentational/Container'
import { compose } from 'redux'
import { CheckoutDataType } from '../../store/reducer/checkout'
import { checkout } from '../../saga/action'
import { checkoutReceive } from '../../store/action'
import { calculateCheckAmount } from '../util'

type PropTypes = {
  data: { [key: string]: ProductType[] }
  checkout: CheckoutDataType
  onCheckoutClicked: () => ReturnType<typeof checkout>
  updateCheckout: (checkout: CheckoutDataType) => void
}

type StateTypes = {}

class OrderBook extends React.PureComponent<
  PropTypes & RouteComponentProps<any>,
  StateTypes
> {
  removeProduct = (product: ProductType) => {
    const updateProducts = this.props.checkout.selectedProducts.filter(
      p => p.id !== product.id
    )

    const newMap = this.props.checkout.subProductsMap
    delete newMap[product.id]

    this.props.updateCheckout({
      selectedProducts: updateProducts,
      subProductsMap: newMap,
    })
  }

  addProduct = (product: ProductType) => {
    this.props.updateCheckout({
      selectedProducts: [...this.props.checkout.selectedProducts, product],
      subProductsMap: this.props.checkout.subProductsMap,
    })
  }

  handleSubProductAdd = (productId: string, subProduct: ProductType) => {
    const list = this.props.checkout.subProductsMap[productId] || []
    this.props.updateCheckout({
      selectedProducts: this.props.checkout.selectedProducts,
      subProductsMap: {
        ...this.props.checkout.subProductsMap,
        [productId]: list.concat(subProduct),
      },
    })
  }

  handleSubProductRemove = (productId: string, subProduct: ProductType) => {
    const list = this.props.checkout.subProductsMap[productId] || []
    let hasMatch = false

    let newList = []

    list.forEach(p => {
      if (p.id === subProduct.id) {
        if (!hasMatch) {
          hasMatch = true
        } else {
          newList = newList.concat(p)
        }
      } else {
        newList = newList.concat(p)
      }
    })

    this.props.updateCheckout({
      selectedProducts: this.props.checkout.selectedProducts,
      subProductsMap: {
        ...this.props.checkout.subProductsMap,
        [productId]: newList,
      },
    })
  }

  handleCheckout = () => {
    this.props.onCheckoutClicked()
    this.props.history.push('/checkout')
  }
  handleReset = () => {
    this.props.updateCheckout({
      selectedProducts: [],
      subProductsMap: {},
    })
  }

  render() {
    const { data } = this.props
    const empty = isEmpty(data)

    if (empty) {
      return (
        <Container>
          <SimpleNavigation onBackClick={null} title="下单" rightAction={null}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p>请先添加产品以及分类</p>
            </div>
          </SimpleNavigation>
        </Container>
      )
    }
    return (
      <SimpleNavigation
        onBackClick={history => history.push('/')}
        title="下单"
        rightAction={null}
      >
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
            <div style={{ paddingBottom: '4rem' }}>
              {Object.keys(this.props.data).map(categoryName => (
                <section key={categoryName} id={categoryName}>
                  {this.props.data[categoryName].map(product => (
                    <ListItem>
                      <OrderProductCard
                        selectedProducts={this.props.checkout.selectedProducts}
                        selectedSubProducts={
                          this.props.checkout.subProductsMap[product.id] || []
                        }
                        product={product}
                        onAdd={this.addProduct}
                        onRemove={this.removeProduct}
                        onSubProductAdd={this.handleSubProductAdd}
                        onSubProductRemove={this.handleSubProductRemove}
                      />
                    </ListItem>
                  ))}
                </section>
              ))}
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <div
              style={{
                width: '95%',
                position: 'fixed',
                backgroundColor: '#fff',
                bottom: 0,
                paddingBottom: '1rem',
              }}
            >
              <BlockButton
                size="large"
                variant="contained"
                color="primary"
                onClick={this.handleCheckout}
              >
                结账 ({calculateCheckAmount(this.props.checkout).formattedSum}
                元)
              </BlockButton>
            </div>
          </Grid>
        </Grid>
      </SimpleNavigation>
    )
  }
}

export default compose(
  withRouter,
  connect(
    getOrderBook,
    { onCheckoutClicked: checkout, updateCheckout: checkoutReceive }
  )
)(OrderBook)
