import React, { useState, useEffect, useRef } from 'react'
import { useMedia } from 'react-media'
import { useStore } from 'react-redux'
import axios from 'axios'
import { record } from 'rrweb'
import {
  Button, Typography, Input, Popover, Icon, Modal, message,
} from 'antd'
import './styles.less'
import { getCurrentUserName } from '../../utils'

const { Text } = Typography

const STATUSES = {
  sending: 'sending',
  succeeded: 'succeeded',
  error: 'error',
}
let logEvents = []
let stopLogging

const Feedback = ({ session }) => {
  const [status, setStatus] = useState()
  const [description, setDescription] = useState()
  const [visible, setVisible] = useState(false)
  const store = useStore()
  const lastScrollTop = useRef(0)
  const anchor = useRef()
  const isSmallScreen = useMedia({ query: '(max-width: 959px)' })

  useEffect(() => {
    logEvents = []

    stopLogging = record({
      emit: (event) => {
        logEvents.push(event)
      },
    })

    return () => {
      stopLogging()

      logEvents = []
    }
  }, [session])

  useEffect(() => {
    if (!visible && status !== STATUSES.sending) {
      setDescription(null)
      setStatus(null)
    }
  }, [visible])

  const handleReportError = () => {
    setStatus(STATUSES.sending)

    axios.post('/api/logs', {
      events: logEvents,
      username: getCurrentUserName(),
      doc: session,
      store: store.getState(),
      description,
    })
      .then(() => {
        setStatus(STATUSES.succeeded)
        message.success('Báo lỗi thành công!')
        setVisible(false)
      })
      .catch(() => {
        setStatus(STATUSES.error)
      })
  }

  const handleScroll = () => {
    if (isSmallScreen) {
      const st = window.pageYOffset || document.documentElement.scrollTop
      if (st > lastScrollTop.current) {
      // scroll down
        anchor.current.style.right = `-${anchor.current.offsetWidth + 10}px`
      } else {
      // scroll up
        anchor.current.style.right = '10px'
      }

      lastScrollTop.current = st <= 0 ? 0 : st
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const reportContent = (
    <div className="error-feedback-content">
      <p align="center" className="title">Báo lỗi</p>
      <div>
        <Text style={{ fontStyle: 'italic' }}>Vui lòng nhập mô tả:</Text>
        <Input.TextArea
          placeholder="Không thể lưu, sai sản phẩm..."
          autoSize={{ minRows: 2, maxRows: 3 }}
          onChange={e => setDescription(e.target.value)}
          value={description}
          disabled={status === STATUSES.sending}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="primary"
            onClick={handleReportError}
            loading={status === STATUSES.sending}
            disabled={!description}
          >
                Gửi
          </Button>
          {status === STATUSES.sending ? <Text type="warning" style={{ fontStyle: 'italic', marginLeft: 5 }}>Vui lòng không đóng trình duyệt</Text> : null}
          {status === STATUSES.error ? <Text type="danger" style={{ fontStyle: 'italic' }}>Có lỗi xảy ra, vui lòng thử lại</Text> : null}
        </div>
      </div>
    </div>
  )

  return (
    <div className="feedback-anchor" ref={anchor}>
      {isSmallScreen ? (
        <>
          <Button type="danger" style={{ boxShadow: '0 0 10px 3px rgba(0,0,0,0.3)' }} onClick={() => setVisible(v => !v)}>
            <Icon type="warning" />
          </Button>
          <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>{reportContent}</Modal>
        </>
      ) : (
        <Popover
          placement="topLeft"
          content={reportContent}
          trigger="click"
          onVisibleChange={v => setVisible(v)}
          visible={visible}
        >
          <Button type="danger" style={{ boxShadow: '0 0 10px 3px rgba(0,0,0,0.3)' }}>
            <Icon type="warning" />
          </Button>
        </Popover>
      ) }
    </div>
  )
}

export default React.memo(Feedback)
