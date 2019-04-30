import * as React from 'react'
import { ClientType } from '../../store/reducer/client'
import Container from '../presentational/Container'
import { Typography, TextField } from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import BlockButton from '../presentational/BlockButton'
import { connect } from 'react-redux'
import { login } from '../../saga/action'
import { getClient } from '../../store/getter'

type PropTypes = {
  client: ClientType
  onSubmit: (username: string, password: string) => void
}
type StateTypes = {
  username: string
  password: string
}

class Login extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    username: '',
    password: '',
  }
  handleUsernameChange = event => {
    this.setState({ username: event.target.value })
  }
  handlePasswordChange = event => {
    this.setState({ password: event.target.value })
  }

  handleLogin = () => {
    this.props.onSubmit(this.state.username, this.state.password)
  }

  render() {
    return (
      <Container>
        <FlexContainer withPadding justifyContent="space-evenly">
          <div style={{ textAlign: 'center' }}>
            <Typography component="h3" variant="h4">
              <p>登录</p>
            </Typography>
          </div>
          <FlexContainer justifyContent="flex-start">
            <TextField
              id="username"
              placeholder="输入用户名"
              fullWidth
              value={this.state.username}
              margin="normal"
              variant="standard"
              onChange={this.handleUsernameChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="password"
              value={this.state.password}
              placeholder="输入密码"
              type="password"
              onChange={this.handlePasswordChange}
              autoComplete="current-password"
              margin="normal"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <BlockButton
              size="large"
              color="primary"
              variant="contained"
              onClick={this.handleLogin}
            >
              登录
            </BlockButton>
          </FlexContainer>
        </FlexContainer>
      </Container>
    )
  }
}

export default connect(
  getClient,
  { onSubmit: login }
)(Login)
