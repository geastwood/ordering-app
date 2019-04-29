import * as React from 'react'
import Container from '../presentational/Container'
import SimpleNavigation from './SimpleNavigation'
import * as qrcode from 'qrcode'
import { Typography } from '@material-ui/core'
import { getCheckout } from '../../store/getter'
import { CheckoutDataType } from '../../store/reducer/checkout'
import { connect } from 'react-redux'

type PropTypes = {
  checkout: CheckoutDataType
}

type StateTypes = {
  dataUrl: null | string
}

class Checkout extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    dataUrl: null,
  }
  componentWillMount() {
    qrcode
      .toDataURL('helloworld')
      .then((dataUrl: string) => this.setState({ dataUrl }))
  }

  render() {
    const { subProductsMap, selectedProducts } = this.props.checkout
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

    return (
      <Container>
        <SimpleNavigation title="收款" rightAction={null}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              paddingTop: 30,
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">请扫码付款</Typography>
            {this.state.dataUrl != null ? (
              <img src={this.state.dataUrl} alt="" width="100%" />
            ) : null}

            <Typography variant="h4">
              {sumProducts + sumSubProducts}元
            </Typography>
          </div>
        </SimpleNavigation>
      </Container>
    )
  }
}

export default connect(getCheckout)(Checkout)
