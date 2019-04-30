import { fork, take, put } from 'redux-saga/effects'
import * as uiActions from './action'
import * as storeActions from '../store/action'
import * as uuid from 'uuid'
import { ProductType } from '../store/reducer/product'
import { CategoryType } from '../store/reducer/category'
import * as qrcode from 'qrcode'
import { calculateCheckAmount } from '../ui/util'

function* resetCheckout() {
  while (true) {
    yield take(uiActions.RESET_CHECKOUT)

    yield put(storeActions.pendingCheckoutRemove())
  }
}
function* handlePollingCheckoutStatus() {
  while (true) {
    const action: ReturnType<typeof uiActions.pollCheckoutStatus> = yield take(
      uiActions.POLL_CHECKOUT_STATUS
    )
    console.log('poll checkout')
    let success = false

    while (!success) {
      try {
        const res = yield fetch(
          `https://v1.api.tc.vastchain.ltd/submerchant-pay/prePay/${
            action.payload
          }?waitForFinish=1`
        )
        const json = yield res.json()
        alert(JSON.stringify(json))
        if (json.status === 'finish') {
          success = true
        }
      } catch (error) {
        console.error('whatnot', error)
      }

      yield put(storeActions.markPaid())
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

    yield put(storeActions.checkoutReceive(action.payload))
    const { sumProducts, sumSubProducts } = calculateCheckAmount(action.payload)
    const totalAmount = (sumProducts + sumSubProducts).toFixed(2)

    const subMerchantId = 'SM4503274928'
    const extraInfo = action.payload

    const res = yield fetch(
      'https://v1.api.tc.vastchain.ltd/submerchant-pay/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subMerchantId,
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

    const qrcodeUrl = yield qrcode.toDataURL(wechatJson.args.code_url)

    yield put(
      storeActions.pendingCheckoutReceive({ qrCode: qrcodeUrl, prepayId })
    )
  }
}

function* rootSaga() {
  try {
    yield fork(handleCreateProduct)
    yield fork(handleCreateCategory)
    yield fork(handleCheckout)
    yield fork(handlePollingCheckoutStatus)
    yield fork(resetCheckout)
  } catch (e) {}
}

export default rootSaga
