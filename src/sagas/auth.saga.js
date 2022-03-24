import {
  select,
  call,
  put,
  all,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import actions from "../actions";

import TYPES from "../types";
import { apiServices } from "../api";
import { handleCatch } from "./utils";

// function* fetchRegister(action) {
//   try {
//     const rs = yield apiServices.postRegister(action.payload);
//     console.log("rs", rs);
//     action?.callback?.(rs);
//     // if (rs.success) {
//     //     // Noty({
//     //     //     title: "Success",
//     //     //     content: rs.message,
//     //     //     type: "success"
//     //     // })();
//     // }
//     // yield put(actions.general.getListBasicSettingGeneralSuccess(rs.data));
//   } catch (error) {
//     // Noty({
//     //     title: "Error",
//     //     content: error.message,
//     //     type: "danger"
//     // })();
//     // yield put(
//     //     actions.general.getListBasicSettingGeneralError(error.message)
//     // );
//   }
// }

function* fetchLogin(action) {
  try {
    const rs = yield apiServices.login(action.payload);
    console.log("rs", rs);
    if (rs?.[0]?.user_id) {
      yield put(actions.auth?.loginSuccessAction(rs));
      action?.callback?.({ success: true, ...rs });
    } else {
      throw rs;
    }
  } catch (error) {
    action?.callback?.({ success: false, message: error.message });
    yield put(actions.auth.loginFailureAction());
    // yield call(handleCatch, error, "login", { withNotification: true });
  }
}

// function* fetchSaveSection(action) {
//   try {
//     yield apiServices.saveSectionView(action.payload);
//   } catch (error) {}
// }

// function* onLogout(action) {
//   try {

//   } catch (error) {}
// }

export default function* authSaga() {
  yield all([
    // yield takeLatest(TYPES.AUTH.REGISTER, fetchRegister),
    yield takeLatest(TYPES.AUTH.LOGIN, fetchLogin),
    // yield takeLatest(TYPES.AUTH.LOGOUT, onLogout),

    // yield takeLatest(TYPES.AUTH.SAVE_SECTION, fetchSaveSection),
  ]);
}
