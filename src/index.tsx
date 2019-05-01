import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter as Router, Route } from 'react-router-dom'

import createStore from './store'
import rootSaga from './saga'
import Home from './ui/layout/Home'
import Products from './ui/layout/Products'
import Categories from './ui/layout/Categories'
import AddCategory from './ui/layout/AddCategory'
import AddProduct from './ui/layout/AddProduct'
import Order from './ui/layout/Order'
import Checkout from './ui/layout/Checkout'

const { store, persistor } = createStore(rootSaga)

class Root extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/product/edit/:id" component={AddProduct} />
            <Route path="/product/new/" component={AddProduct} />
            <Route path="/categories" component={Categories} />
            <Route path="/category/add" component={AddCategory} />
            <Route path="/order" component={Order} />
            <Route path="/checkout" component={Checkout} />
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

render(<Root />, document.getElementById('app'))
