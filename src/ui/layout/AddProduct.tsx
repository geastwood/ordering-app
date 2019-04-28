import * as React from 'react'
import Container from '../presentational/Container'
import SimpleNavigation from '../layout/SimpleNavigation'
import { TextField } from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import BottomButtonGroup from '../presentational/BottomButtonGroup'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as uiActions from '../../saga/action'

type PropTypes = {
  onCancel: () => void
  onSubmit: (product: StateTypes) => void
}

type StateTypes = {
  price: string
  name: string
}

class AddProduct extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    price: '',
    name: '',
  }
  handleValueChange = (prop: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [prop]: event.target.value })
  }

  clear = () => {
    this.setState({ price: '', name: '' })
  }
  handleSubmit = () => {
    if (this.state.name == null || this.state.name.length === 0) {
      alert('产品名无效，请重新输入')
      this.clear()
      return
    }

    if (Number.isNaN(Number(this.state.price))) {
      alert('产品价格无效，请重新输入')
      this.clear()
      return
    }
    this.props.onSubmit(this.state)
    this.clear()
  }
  render() {
    return (
      <Container>
        <SimpleNavigation title="添加产品" rightAction={null}>
          <FlexContainer justifyContent="space-between">
            <TextField
              id="outlined-simple-start-adornment"
              fullWidth
              required
              value={this.state.name}
              onChange={this.handleValueChange('name')}
              variant="outlined"
              label="产品名称"
            />
            <TextField
              id="outlined-adornment-amount"
              variant="outlined"
              required
              label="价格"
              onChange={this.handleValueChange('price')}
              type="number"
              fullWidth
              value={this.state.price}
            />
            <BottomButtonGroup
              onCancel={() => this.props.history.goBack()}
              onSubmit={this.handleSubmit}
            />
          </FlexContainer>
        </SimpleNavigation>
      </Container>
    )
  }
}

const ConnectedAddProduct = compose(
  withRouter,
  connect(
    null,
    {
      onSubmit: uiActions.addProduct,
    }
  )
)(AddProduct)

export default ConnectedAddProduct
