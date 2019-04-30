import * as React from 'react'
import Container from '../presentational/Container'
import SimpleNavigation from './SimpleNavigation'
import { Typography, Button } from '@material-ui/core'
import { getCheckout } from '../../store/getter'
import { CheckoutDataType } from '../../store/reducer/checkout'
import { connect } from 'react-redux'
import { calculateCheckAmount } from '../util'
import { PendingCheckoutType } from '../../store/reducer/pendingCheckout'
import { pollCheckoutStatus, resetCheckout } from '../../saga/action'
import { compose } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'

type PropTypes = {
  checkout: CheckoutDataType
  pendingCheckout: PendingCheckoutType
  onMount: (prepayId: string) => void
  onResetCheckout: () => void
}

type StateTypes = {}

class Checkout extends React.PureComponent<
  PropTypes & RouteComponentProps<any>,
  StateTypes
> {
  state = {}

  componentDidUpdate() {
    // start polling for order status
    if (
      !this.props.pendingCheckout.paid &&
      this.props.pendingCheckout.prepayId
    ) {
      this.props.onMount &&
        this.props.onMount(this.props.pendingCheckout.prepayId)
    }
  }
  handleConfirm = () => {
    this.props.onResetCheckout()
    this.props.history.push('/')
  }

  render() {
    const { sumProducts, sumSubProducts } = calculateCheckAmount(
      this.props.checkout
    )

    const { qrCode, paid } = this.props.pendingCheckout

    return (
      <Container>
        <SimpleNavigation onBackClick={null} title="收款" rightAction={null}>
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
            {qrCode != null && !paid ? (
              <img src={qrCode} alt="" width="100%" />
            ) : null}
            {paid ? (
              <div style={{ padding: 30 }}>
                <Button
                  size="large"
                  variant="outlined"
                  color="secondary"
                  onClick={this.handleConfirm}
                >
                  支付成功， 返回
                </Button>
              </div>
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

export default compose(
  withRouter,
  connect(
    getCheckout,
    { onMount: pollCheckoutStatus, onResetCheckout: resetCheckout }
  )
)(Checkout)
