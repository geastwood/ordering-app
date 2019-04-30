import { delay, fork, take, put, select, call } from 'redux-saga/effects'
import * as uiActions from './action'
import * as storeActions from '../store/action'
import * as uuid from 'uuid'
import { ProductType } from '../store/reducer/product'
import { CategoryType } from '../store/reducer/category'
import * as qrcode from 'qrcode'
import { calculateCheckAmount } from '../ui/util'
import { getClient, getCheckout } from '../store/getter'
import { ClientType } from '../store/reducer/client'

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

function* printReceipt() {
  const { checkout } = yield select(getCheckout)
  console.log(checkout)
}

function* handleResetCheckout() {
  while (true) {
    yield take(uiActions.RESET_CHECKOUT)

    yield put(storeActions.checkoutRemove())
  }
}

function* handlePollingCheckoutStatus() {
  while (true) {
    const action: ReturnType<typeof uiActions.pollCheckoutStatus> = yield take(
      uiActions.POLL_CHECKOUT_STATUS
    )

    let success = false
    yield call(printReceipt)
    while (!success) {
      try {
        const url = `https://v1.api.tc.vastchain.ltd/submerchant-pay/prePay/${
          action.payload
        }?waitForFinish=1`

        const res = yield fetch(url)
        const json = yield res.json()

        console.log(json.status)
        if (json.status === 'finish') {
          success = true
          yield put(storeActions.markPaid())
          yield put(storeActions.checkoutRemove())
        } else {
          yield delay(50)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
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

    yield put(storeActions.pendingCheckoutRemove())

    const { client }: { client: ClientType } = yield select(getClient)

    if (!client.userId) {
      alert('无法得到商户信息。')
      break
    }

    yield put(storeActions.checkoutReceive(action.payload))

    const { sumProducts, sumSubProducts } = calculateCheckAmount(action.payload)
    const totalAmount = (sumProducts + sumSubProducts).toFixed(2)

    const extraInfo = action.payload

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
          extraInfo,
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
    yield fork(handlePollingCheckoutStatus)
    yield fork(handleResetCheckout)
    yield fork(handleLogin)
    yield fork(handleLogout)
  } catch (e) {}
}

export default rootSaga
