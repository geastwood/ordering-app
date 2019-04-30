import * as React from 'react'
import Container from '../presentational/Container'
import SimpleNavigation from '../layout/SimpleNavigation'
import { TextField } from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import BottomButtonGroup from '../presentational/BottomButtonGroup'
import { compose } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import * as uiActions from '../../saga/action'
import { CategoryType } from '../../store/reducer/category'
import { get, isEmpty } from 'lodash'
import { getCategoryById } from '../../store/getter'

type PropTypes = {
  category: CategoryType
  onCancel: () => void
  onSubmit: (category: CategoryType) => void
}

type StateTypes = {
  category: CategoryType | null
}

class AddProduct extends React.PureComponent<
  PropTypes & RouteComponentProps<any>,
  StateTypes
> {
  state = {
    category: this.props.category || null,
  }
  handleValueChange = (prop: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (this.state.category) {
      this.setState({
        category: {
          ...this.state.category,
          [prop]: event.target.value,
        },
      })
    } else {
      this.setState({
        category: {
          [prop]: event.target.value,
        },
      })
    }
  }

  clear = () => {
    this.setState({ category: null })
  }

  handleSubmit = () => {
    const name = get(this.state, 'category.name')
    if (isEmpty(name)) {
      alert('类别名无效，请重新输入')
      this.clear()
      return
    }

    this.props.onSubmit(this.state.category)
    this.clear()
  }
  render() {
    console.log(this.props.category)
    return (
      <Container>
        <SimpleNavigation
          onBackClick={null}
          title="添加产品类别"
          rightAction={null}
        >
          <FlexContainer justifyContent="space-between">
            <TextField
              id="outlined-simple-start-adornment"
              fullWidth
              required
              value={get(this.state, 'category.name', '')}
              onChange={this.handleValueChange('name')}
              variant="standard"
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
