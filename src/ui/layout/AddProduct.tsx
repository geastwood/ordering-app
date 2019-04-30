import * as React from 'react'
import Container from '../presentational/Container'
import SimpleNavigation from '../layout/SimpleNavigation'
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import FlexContainer from '../presentational/FlexContainer'
import BottomButtonGroup from '../presentational/BottomButtonGroup'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as uiActions from '../../saga/action'
import CategorySelect from './CategorySelect'
import { CategoryType } from '../../store/reducer/category'
import ProductSelectList from '../presentational/ProductSelectList'
import { getProducts } from '../../store/getter'
import { ProductType } from '../../store/reducer/product'
import { omit } from 'lodash'

type PropTypes = {
  products: ProductType[]
  onCancel: () => void
  onSubmit: (product: StateTypes) => void
}

type StateTypes = {
  price: string
  isSubProduct: boolean
  name: string
  toAddSubProducts: boolean
  categories: CategoryType[]
  subProducts: ProductType[]
}

class AddProduct extends React.PureComponent<PropTypes, StateTypes> {
  state = {
    price: '',
    isSubProduct: false,
    toAddSubProducts: false,
    name: '',
    categories: [],
    subProducts: [],
  }
  handleValueChange = (prop: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [prop]: event.target.value })
  }

  clear = () => {
    this.setState({
      price: '',
      name: '',
      isSubProduct: false,
      toAddSubProducts: false,
      categories: [],
      subProducts: [],
    })
  }
  handleSubmit = () => {
    if (this.state.name == null || this.state.name.length === 0) {
      alert('产品名无效，请重新输入')
      this.clear()
      return
    }

    if (
      this.state.price.length === 0 ||
      Number.isNaN(Number(this.state.price))
    ) {
      alert('产品价格无效，请重新输入')
      this.clear()
      return
    }
    this.props.onSubmit(omit(this.state, ['toAddSubProducts']))
    this.clear()
  }

  handleAddCategories = (categories: CategoryType[]) => {
    this.setState({ categories })
  }

  handleSubProductToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ isSubProduct: event.target.checked })
  }

  handleAddSubProductsToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ toAddSubProducts: event.target.checked })
  }

  handleSubProductChange = (product: ProductType) => {
    let updatedList = []
    const selected = this.state.subProducts.find(sub => sub.id === product.id)

    if (selected) {
      updatedList = this.state.subProducts.filter(sub => sub.id !== product.id)
    } else {
      updatedList = [...this.state.subProducts, product]
    }

    this.setState({
      subProducts: updatedList,
    })
  }

  render() {
    const subProductList = this.props.products.filter(
      ({ isSubProduct }) => isSubProduct === true
    )

    return (
      <Container>
        <SimpleNavigation
          onBackClick={null}
          title="添加产品"
          rightAction={null}
        >
          <FlexContainer>
            <FlexContainer justifyContent="flex-start">
              <TextField
                id="outlined-simple-start-adornment"
                fullWidth
                required
                value={this.state.name}
                onChange={this.handleValueChange('name')}
                variant="standard"
                label="产品名称"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.isSubProduct}
                    onChange={this.handleSubProductToggle}
                    value="subproduct"
                  />
                }
                label="这个是子产品"
              />
              <TextField
                id="outlined-adornment-amount"
                variant="standard"
                required
                label="价格"
                onChange={this.handleValueChange('price')}
                type="number"
                fullWidth
                value={this.state.price}
              />
              <div
                style={{
                  marginTop: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CategorySelect
                  onSelect={this.handleAddCategories}
                  selected={this.state.categories}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={
                        this.state.isSubProduct || subProductList.length === 0
                      }
                      checked={this.state.toAddSubProducts}
                      onChange={this.handleAddSubProductsToggle}
                      value="to-add-subproduct"
                    />
                  }
                  label="添加子产品"
                />
              </div>

              <div style={{ overflow: 'scroll', display: 'flex', flex: 1 }}>
                {this.state.toAddSubProducts ? (
                  <ProductSelectList
                    products={subProductList}
                    selectedProducts={this.state.subProducts}
                    onSelect={this.handleSubProductChange}
                  />
                ) : null}
              </div>
            </FlexContainer>
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
    getProducts,
    {
      onSubmit: uiActions.addProduct,
    }
  )
)(AddProduct)

export default ConnectedAddProduct
