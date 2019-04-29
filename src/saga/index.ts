import { fork, take, put } from 'redux-saga/effects'
import * as uiActions from './action'
import * as storeActions from '../store/action'
import * as uuid from 'uuid'
import { ProductType } from '../store/reducer/product'
import { CategoryType } from '../store/reducer/category'

function* handleCreateProduct() {
  while (true) {
    const action: ReturnType<typeof uiActions.addProduct> = yield take(
      uiActions.ADD_PRODUCT
    )
    const id = uuid.v4()

    const product: ProductType = {
      ...action.payload,
      id,
    }

    yield put(storeActions.productAdd(product))
  }
}

function* handleCreateCategory() {
  while (true) {
    const action: ReturnType<typeof uiActions.addCategory> = yield take(
      uiActions.ADD_CATEGORY
    )
    const id = uuid.v4()

    const category: CategoryType = {
      ...action.payload,
      id,
    }

    yield put(storeActions.categoryAdd(category))
  }
}

function* handleCheckout() {
  while (true) {
    const action: ReturnType<typeof uiActions.checkout> = yield take(
      uiActions.CHECKOUT
    )

    yield put(storeActions.checkoutReceive(action.payload))
  }
}

function* rootSaga() {
  try {
    yield fork(handleCreateProduct)
    yield fork(handleCreateCategory)
    yield fork(handleCheckout)
  } catch (e) {}
}

export default rootSaga
