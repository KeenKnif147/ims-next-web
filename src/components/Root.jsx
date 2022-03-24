import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter } from 'react-router-dom'
import { Spin, ConfigProvider } from 'antd'
import viVN from 'antd/es/locale/vi_VN'
import App from './App'

// antd's locale config for Vietnamese is not completed
const customLocale = {
  ...viVN,
  Text: {
    expand: 'thêm', // used in expandable ellipsis text
  },
}

const Root = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={<Spin />} persistor={persistor}>
      <HashRouter>
        <ConfigProvider locale={customLocale}>
          <App />
        </ConfigProvider>
      </HashRouter>
    </PersistGate>
  </Provider>
)

export default Root
