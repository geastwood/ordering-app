import * as React from 'react'
import Container from '../presentational/Container'
import FlexContainer from '../presentational/FlexContainer'
import ButtonLink from '../presentational/ButtonLink'
import Button from '../presentational/BlockButton'
import { Typography, Link } from '@material-ui/core'
import { connect } from 'react-redux'
import { ClientType } from '../../store/reducer/client'
import { getClient } from '../../store/getter'
import Login from './Login'
import { logout } from '../../saga/action'
import { checkoutRemove } from '../../store/action'

type PropTypes = {
  client: ClientType
  onLogout: () => void
  onMount: () => void
}

class Home extends React.PureComponent<PropTypes> {
  componentDidMount() {
    this.props.onMount()
  }
  render() {
    if (!this.props.client.userId) {
      return <Login />
    }

    return (
      <Container>
        <FlexContainer withPadding justifyContent="space-evenly">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <p style={{ marginRight: 5 }}>{this.props.client.displayName}</p>
              <Link onClick={this.props.onLogout}>切换商户</Link>
            </div>
            <Typography component="h3" variant="h4">
              <p>下单系统</p>
            </Typography>
          </div>
          <FlexContainer>
            <ButtonLink path="/categories">
              <Button variant="contained" color="primary">
                <p style={{ fontSize: '1.5rem', color: 'white' }}>产品分类</p>
              </Button>
            </ButtonLink>
            <ButtonLink path="/products">
              <Button variant="contained" color="primary">
                <p style={{ fontSize: '1.5rem', color: 'white' }}>产品</p>
              </Button>
            </ButtonLink>
            <ButtonLink path="/order">
              <Button variant="contained" color="primary">
                <p style={{ fontSize: '1.5rem', color: 'white' }}>下单</p>
              </Button>
            </ButtonLink>
          </FlexContainer>
        </FlexContainer>
      </Container>
    )
  }
}

export default connect(
  getClient,
  { onLogout: logout, onMount: checkoutRemove }
)(Home)
