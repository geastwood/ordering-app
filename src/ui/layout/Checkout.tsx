import * as React from 'react'
import Container from '../presentational/Container'
import SimpleNavigation from './SimpleNavigation'
import * as qrcode from 'qrcode'
import { Typography } from '@material-ui/core'

type PropTypes = {}

type StateTypes = {
  dataUrl: null | string
}

export default class Checkout extends React.PureComponent<
  PropTypes,
  StateTypes
> {
  state = {
    dataUrl: null,
  }
  componentWillMount() {
    qrcode
      .toDataURL('helloworld')
      .then((dataUrl: string) => this.setState({ dataUrl }))
  }

  render() {
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
          </div>
        </SimpleNavigation>
      </Container>
    )
  }
}
