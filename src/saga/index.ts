import {
  delay,
  fork,
  take,
  put,
  select,
  call,
  cancel,
} from 'redux-saga/effects'
import * as uiActions from './action'
import * as storeActions from '../store/action'
import * as uuid from 'uuid'
import { ProductType } from '../store/reducer/product'
import { CategoryType } from '../store/reducer/category'
import * as qrcode from 'qrcode'
import { calculateCheckAmount } from '../ui/util'
import { getClient, getCheckout } from '../store/getter'
import { AppState } from '../store/reducer/index'

function* handleLogout() {
  while (true) {
    yield take(uiActions.LOGOUT)
    const answer = confirm('确认注销？')
    if (answer) {
      yield put(storeActions.clientRemove())
    }
  }
}

function* handleLogin() {
  while (true) {
    const action: ReturnType<typeof uiActions.login> = yield take(
      uiActions.LOGIN
    )

    try {
      const res = yield fetch(
        'https://v1.api.tc.vastchain.ltd/merchant/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: action.payload.username,
            pw: action.payload.password,
          }),
        }
      )

      const json = yield res.json()
      if (json.status === 'success') {
        yield put(storeActions.clientReceive(json))
      } else {
        alert(json.msg || '登录失败，请稍后重试。')
      }
    } catch (error) {
      alert('登录失败，请稍后重试。')
    }
  }
}

function* printReceipt(prepayId: string) {
  const { checkout }: AppState = yield select(getCheckout)
  const { client }: AppState = yield select(getClient)

  const { sumProducts, sumSubProducts } = calculateCheckAmount(checkout)
  const { selectedProducts, subProductsMap } = checkout

  let menu = []
  selectedProducts.forEach(product => {
    menu = menu.concat({
      name: product.name,
      price: Number(product.price).toFixed(2),
    })
    const subProducts = subProductsMap[product.id] || []
    subProducts.forEach(subProduct => {
      menu = menu.concat({
        name: ` +${subProduct.name}`,
        price: Number(subProduct.price).toFixed(2),
      })
    })
  })

  const data = {
    menu,
    prepayId,
    totalAmount: (sumProducts + sumSubProducts).toFixed(2),
    subMerchantId: client.userId,
    subMerchantDisplayName: client.displayName,
  }

  try {
    app.print(JSON.stringify(data))
  } catch (error) {}
}

function* handleResetCheckout() {
  while (true) {
    yield take(uiActions.RESET_CHECKOUT)

    yield put(storeActions.checkoutRemove())
  }
}

function* handlePollingCheckoutStatus(prepayId: string) {
  let success = false
  while (!success) {
    try {
      const url = `https://v1.api.tc.vastchain.ltd/submerchant-pay/prePay/${prepayId}?waitForFinish=1`
      const res = yield fetch(url)
      const json = yield res.json()

      if (json.status === 'finish') {
        success = true
        yield put(storeActions.markPaid())
        yield put(storeActions.checkoutRemove())
        printReceipt(prepayId)
      } else {
        yield delay(50)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
function* saveData() {
  const state: AppState = yield select()
  yield fetch(
    `https://v1.api.tc.vastchain.ltd/submerchant-pay/backup?submerchantId=${
      state.client.userId
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        localStorage: state,
      }),
    }
  )
}

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

    yield fork(saveData)

    yield put(storeActions.productAdd(product))
  }
}

function* handleCreateCategory() {
  while (true) {
    const action: ReturnType<typeof uiActions.addCategory> = yield take(
      uiActions.ADD_CATEGORY
    )

    const id = action.payload.id || uuid.v4()

    const category: CategoryType = {
      ...action.payload,
      id,
    }

    yield fork(saveData)
    yield put(storeActions.categoryAdd(category))
  }
}

// cached polling module
const checker = null

function* handleCheckout() {
  while (true) {
    yield take(uiActions.CHECKOUT)
    yield put(storeActions.pendingCheckoutRemove())

    const { client }: AppState = yield select(getClient)

    if (checker) {
      yield cancel(checker)
    }

    if (!client.userId) {
      alert('无法得到商户信息。')
      break
    }
    const { checkout } = yield select(getCheckout)

    const { sumProducts, sumSubProducts } = calculateCheckAmount(checkout)
    const totalAmount = (sumProducts + sumSubProducts).toFixed(2)

    const res = yield fetch(
      'https://v1.api.tc.vastchain.ltd/submerchant-pay/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subMerchantId: client.userId,
          orderId: null,
          totalAmount,
          extraInfo: checkout,
        }),
      }
    )

    const { status, prepayId } = yield res.json()

    if (status !== 'success') {
      break
    }

    const wechat = yield fetch(
      'https://v1.api.tc.vastchain.ltd/submerchant-pay/wechatPayNative/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prepayId,
        }),
      }
    )

    const wechatJson = yield wechat.json()

    if (wechatJson.status !== 'success') {
      break
    }

    const qrcodeUrl = yield qrcode.toDataURL(wechatJson.args.code_url, {
      width: 500,
    })

    // fork the polling checker
    checker = yield fork(handlePollingCheckoutStatus, prepayId)

    yield put(
      storeActions.pendingCheckoutReceive({
        qrCode: qrcodeUrl,
        prepayId,
        paid: false,
      })
    )
  }
}

function* rootSaga() {
  try {
    yield fork(handleCreateProduct)
    yield fork(handleCreateCategory)
    yield fork(handleCheckout)
    yield fork(handleResetCheckout)
    yield fork(handleLogin)
    yield fork(handleLogout)
  } catch (e) {}
}

export default rootSaga
