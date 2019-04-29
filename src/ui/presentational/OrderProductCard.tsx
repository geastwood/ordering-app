import * as React from 'react'
import { ProductType } from '../../store/reducer/product'
import {
  Card,
  CardContent,
  Typography,
  withStyles,
  Chip,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
} from '@material-ui/core'
import Button from '../presentational/BlockButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { groupBy } from 'lodash'

type PropTypes = {
  product: ProductType
  selectedProducts: ProductType[]
  onRemove: (product: ProductType) => void
  onAdd: (product: ProductType) => void
}

const FullWidthCard = withStyles({
  root: {
    width: '100%',
  },
})(Card)

type StateProps = {
  openSubProductsSelection: boolean
  selectedSubProducts: ProductType[]
}

export default class ProductCard extends React.PureComponent<
  PropTypes,
  StateProps
> {
  state = {
    openSubProductsSelection: false,
    selectedSubProducts: [],
  }
  openSelectSubProducts = () => {
    this.setState({ openSubProductsSelection: true })
  }
  closeSelectSubProducts = () => {
    this.setState({ openSubProductsSelection: false })
  }

  handleRemove = (product: ProductType) => {
    this.setState({ selectedSubProducts: [] })
    this.props.onRemove(product)
  }

  handleSubProductAdd = (subproduct: ProductType) => {
    this.setState({
      selectedSubProducts: [...this.state.selectedSubProducts, subproduct],
    })
  }
  handleSubProductRemove = (subproduct: ProductType) => {
    this.setState({
      selectedSubProducts: this.state.selectedSubProducts.filter(
        s => s.id !== subproduct.id
      ),
    })
  }

  render() {
    const { product, selectedProducts } = this.props
    const count = selectedProducts.filter(s => s.id === product.id).length
    const selectedSubProductsGrouped = groupBy(
      this.state.selectedSubProducts,
      'name'
    )

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <div style={{ flex: 1, display: 'flex', width: '80%' }}>
          <Dialog
            fullWidth
            open={this.state.openSubProductsSelection}
            onClose={this.closeSelectSubProducts}
          >
            <DialogTitle>选择子产品</DialogTitle>
            <ul style={{ padding: '24px', maxHeight: 400, overflow: 'scroll' }}>
              {product.subProducts.map(subproduct => (
                <li key={subproduct.id}>
                  <Grid container>
                    <Grid item xs={8}>
                      <span>{subproduct.name}</span>
                    </Grid>
                    <Grid item xs={2}>
                      <DeleteIcon
                        onClick={() => this.handleSubProductRemove(subproduct)}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <AddIcon
                        onClick={() => this.handleSubProductAdd(subproduct)}
                      />
                    </Grid>
                  </Grid>
                </li>
              ))}
            </ul>
          </Dialog>
          <FullWidthCard>
            <Button component="div" onClick={() => this.props.onAdd(product)}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {count ? (
                    <Chip label={`${count}个`} color="secondary" />
                  ) : null}
                  {product.name}
                </Typography>
                <ul>
                  {Object.keys(selectedSubProductsGrouped).map(
                    subProductName => (
                      <li key={subProductName}>
                        {`(${
                          selectedSubProductsGrouped[subProductName].length
                        }个) ${subProductName}`}
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Button>
            <CardActions>
              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <Button
                    onClick={() => this.handleRemove(product)}
                    color="secondary"
                    variant="outlined"
                    disabled={count === 0}
                  >
                    删除
                    <DeleteIcon />
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={this.openSelectSubProducts}
                    color="primary"
                    variant="outlined"
                    disabled={product.subProducts.length === 0 || count === 0}
                  >
                    子产品
                    <AddIcon />
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </FullWidthCard>
        </div>
      </div>
    )
  }
}
