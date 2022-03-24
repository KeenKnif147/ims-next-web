import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Button } from 'antd'
import ws from '../../ws'
import './styles.less'
import { isStaging } from '../../utils'

const TIME_TO_REFRESH = 5 // min
const { FRONTEND_VERSION } = window._env_ || {}
let hidden
let visibilityChange

if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden'
  visibilityChange = 'visibilitychange'
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden'
  visibilityChange = 'msvisibilitychange'
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden'
  visibilityChange = 'webkitvisibilitychange'
}

const reload = () => {
  window.onbeforeunload = null // disable Prompt
  location.reload.apply(location)
}

const Refreshing = () => {
  const [secondsTogo, setSecondsTogo] = useState(TIME_TO_REFRESH * 60)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [needRefresh, setNeedRefresh] = useState(false)
  const [refreshTime, setRefreshTime] = useState(null)

  useEffect(() => {
    if (needRefresh) {
      setRefreshTime(new Date(new Date().getTime() + TIME_TO_REFRESH * 60000))
    }
  }, [needRefresh])

  useEffect(() => {
    if (refreshTime) {
      setInterval(() => {
        const distance = Math.ceil((refreshTime.getTime() - (new Date()).getTime()) / 1000)

        if (distance <= 0) {
          reload()
        } else {
          setSecondsTogo(distance)
        }
      }, 1000)
    }
  }, [refreshTime])

  useEffect(() => {
    ws.socket.on('refresh', ({ polite = true, staging = false }) => {
      // only refresh staging
      if (staging && !isStaging()) return

      // refresh both staging and prod
      if (!polite) {
        reload()
      } else {
        setNeedRefresh(true)
        setShowSnackbar(true)
      }
    })
  }, [])

  const handleVisibilityChanged = useCallback(() => {
    if (needRefresh) {
      setShowSnackbar(true)
    } else if (!document[hidden] && FRONTEND_VERSION) {
      axios('/api/version')
        .then(res => {
          const { version } = res.data || {}

          if (version && version.toString() !== FRONTEND_VERSION.toString()) {
            setNeedRefresh(true)
            setShowSnackbar(true)
          }
        })
        .catch(() => {})
    }
  }, [needRefresh])

  useEffect(() => {
    document.addEventListener(visibilityChange, handleVisibilityChanged)

    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChanged)
    }
  }, [handleVisibilityChanged])

  return (
    <div className={`refreshing-snackbar ${showSnackbar ? 'show' : 'hide'}`}>
      <div>
          Có bản cập nhật mới, vui lòng hoàn tất công việc và tải lại trang hoặc hệ thống sẽ tự động tải lại sau {Math.floor(secondsTogo / 60)} phút {secondsTogo % 60} giây
      </div>
      <div className="flex" style={{ flexGrow: 1 }}>
        <Button type="link" style={{ flexGrow: 1 }} onClick={reload}>Tải lại</Button>
        <Button type="link" style={{ flexGrow: 1 }} onClick={() => setShowSnackbar(false)}>Ẩn</Button>
      </div>
    </div>
  )
}

export default Refreshing
