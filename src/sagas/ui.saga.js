import { takeEvery, call, all, fork } from "redux-saga/effects";

import { Modal, message as antdMessage } from "antd";

import TYPES from "../types";

function countDown({ message, type, autoClose, onOk }) {
  let secondsToGo = autoClose || 2;
  const modal = Modal[type]({
    title: message,
    content: `Ấn Enter để đóng, hoặc thông báo sẽ tự đóng sau ${secondsToGo} giây.`,
    onOk,
  });

  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `Ấn Enter để đóng, hoặc thông báo sẽ tự đóng sau ${secondsToGo} giây.`,
      onOk,
    });
  }, 1000);

  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
    if (typeof onOk === "function") {
      onOk();
    }
  }, secondsToGo * 1000);
}

function* pushNotification({ payload = {} }) {
  const { type, message, autoClose, onOk } = payload;

  if (!type || !message) {
    throw new Error("type and message are required for notification");
  }

  yield call(countDown, {
    message,
    type,
    autoClose,
    onOk,
  });
}

function* sendFeedback({ payload = {} }) {
  const { type, message } = payload;

  if (!type || !message) {
    throw new Error("type and message are required for feedback");
  }

  yield call(antdMessage[type], message, 5);
}

function* watchNotification() {
  yield takeEvery(TYPES.UI.PUSH_NOTIFICATION, pushNotification);
}

function* watchFeedback() {
  yield takeEvery(TYPES.UI.SEND_FEEDBACK, sendFeedback);
}

export default function* () {
  yield all([fork(watchNotification), fork(watchFeedback)]);
}
