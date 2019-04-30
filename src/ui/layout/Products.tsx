import * as React from 'react'
import Container from '../presentational/Container'
import SimpleNavigation from './SimpleNavigation'
import AddButton from '../presentational/AddButton'
import { ProductType } from '../../store/reducer/product'
import { List, ListItem, Grid, Button } from '@material-ui/core'
import { getProducts } from '../../store/getter'
import { connect } from 'react-redux'
import ProductCard from '../presentational/ProductCard'
import Scrollspy from 'react-scrollspy'
import { groupBy, get } from 'lodash'

type PropTypes = {
  products: ProductType[]
}

class Products extends React.PureComponent<PropTypes> {
  render() {
    const { products } = this.props
    const data = groupBy(products, product =>
      get(product, 'categories[0].name', '无分类')
    )
    return (
      <Container>
        <SimpleNavigation
          title="产品目录"
          onBackClick={null}
          rightAction={props => (
            <AddButton onClick={() => props.history.push('/product/add')} />
          )}
        >
          {products.length ? (
            <Grid container>
              <Grid item xs={3}>
                <div style={{ position: 'fixed', marginTop: '4rem' }}>
                  <Scrollspy
                    items={Object.keys(data)}
                    currentClassName="is-current"
                  >
                    {Object.keys(data).map(categoryName => (
                      <li key={categoryName}>
                        <Button>
                          <a className="button" href={`#${categoryName}`}>
                            {categoryName}
                          </a>
                        </Button>
                      </li>
                    ))}
                  </Scrollspy>
                </div>
              </Grid>
              <Grid item xs={9}>
                <div style={{ paddingBottom: '4rem' }}>
                  {Object.keys(data).map(categoryName => (
                    <section key={categoryName} id={categoryName}>
                      {data[categoryName].map(product => (
                        <ListItem key={product.id}>
                          <ProductCard product={product} />
                        </ListItem>
                      ))}
                    </section>
                  ))}
                </div>
              </Grid>
            </Grid>
          ) : (
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p>无产品定义，点击右上角"+"，添加产品</p>
            </div>
          )}
        </SimpleNavigation>
      </Container>
    )
  }
}

const ConnectedProducts = connect(getProducts)(Products)

export default ConnectedProducts
