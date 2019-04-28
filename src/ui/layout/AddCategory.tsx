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
  name: string
}

class AddProduct extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    name: '',
  }
  handleValueChange = (prop: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [prop]: event.target.value })
  }

  clear = () => {
    this.setState({ name: '' })
  }
  handleSubmit = () => {
    if (this.state.name == null || this.state.name.length === 0) {
      alert('类别名无效，请重新输入')
      this.clear()
      return
    }

    this.props.onSubmit(this.state)
    this.clear()
  }
  render() {
    return (
      <Container>
        <SimpleNavigation title="添加产品类别" rightAction={null}>
          <FlexContainer justifyContent="space-between">
            <TextField
              id="outlined-simple-start-adornment"
              fullWidth
              required
              value={this.state.name}
              onChange={this.handleValueChange('name')}
              variant="outlined"
              label="产品类别名称"
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

const ConnectedAddCategory = compose(
  withRouter,
  connect(
    null,
    {
      onSubmit: uiActions.addCategory,
    }
  )
)(AddProduct)

export default ConnectedAddCategory
