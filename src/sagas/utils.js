import {
  select,
  call,
  put,
  all,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import TYPES from "../types";
import BusinessWarning from "../errors/BusinessWarning";
import BusinessError from "../errors/BusinessError";
import ApiError from "../errors/ApiError";

import { NOTIFICATION_TYPES } from "../constants";

export function* handleCatch(
  error,
  action,
  options = { withNotification: true }
) {
  if (typeof action === "string") {
    //   yield put({
    //     type: failure(action),
    //     error,
    //   })
  } else {
    //   yield put(action.failure({
    //     error,
    //   }))
  }

  if (options.withNotification) {
    if (error.isAxiosError && error.message === "Network Error") {
      yield put({
        type: TYPES.UI.PUSH_NOTIFICATION,
        payload: {
          type: NOTIFICATION_TYPES.ERROR,
          message: "Lỗi đường truyền, vui lòng kiểm tra lại internet",
          onOk: options.onOk,
        },
      });
    } else if (
      error instanceof BusinessError ||
      error instanceof BusinessError ||
      error instanceof ApiError
    ) {
      yield put({
        type: TYPES.UI.PUSH_NOTIFICATION,
        payload: {
          type: NOTIFICATION_TYPES.WARNING,
          message: error.errorMessage,
          onOk: options.onOk,
        },
      });
    } else {
      yield put({
        type: TYPES.UI.PUSH_NOTIFICATION,
        payload: {
          type: NOTIFICATION_TYPES.ERROR,
          message: "Có lỗi xảy ra, vui lòng thử lại",
          onOk: options.onOk,
        },
      });
    }
  }

  if (!(error instanceof BusinessWarning || error instanceof BusinessError)) {
    //   if (window._env_ && ['production', 'staging'].includes(window._env_.FRONTEND_ENVIRONMENT)) {
    //     yield call(logToSentry, error)
    //   } else {
    //     console.error(error)
    //   }
  }
}
