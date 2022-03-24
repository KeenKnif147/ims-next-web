import React from 'react'
import { Modal, Button } from 'antd'
import { connect } from 'react-redux'
import * as Sentry from '@sentry/browser'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error) {
    // Display fallback UI
    this.setState({ hasError: true })

    const { store } = this.props

    if (store) {
      Sentry.withScope(scope => {
        scope.setExtras({
          store,
        })
        scope.setUser({
          id: store.auth.userInfo.user_id,
          username: store.auth.userInfo.username,
        })
        scope.setTags({
          context: 'react',
          version: '2',
          tool: window.location.hash.replace('#', ''),
        })

        Sentry.captureException(error)
      })
    }

    Sentry.captureException(error)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Modal
          title={<span>Có lỗi xảy ra</span>}
          visible={hasError}
          footer={[
            <Button type="primary" onClick={() => location.reload()}>Tải lại trang</Button>,
          ]}
        >
          <p>Rất tiếc, có lỗi phát sinh trong quá trình xử lý</p>
          <p>Vui lòng tải lại trang!</p>
        </Modal>
      )
    }
    return children
  }
}

export default connect(state => ({ store: state }))(ErrorBoundary)
