import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import './styles.less'

const preventKeydown = e => {
  e.preventDefault()

  return false
}

const LoadingIndicator = () => {
  const loading = useSelector(state => state.loadingIndicator.loading)

  useEffect(() => {
    if (loading.length) {
      document.body.style.pointerEvents = 'none'
      document.body.style.userSelect = 'none'
      document.addEventListener('keydown', preventKeydown)
    } else {
      document.body.style.pointerEvents = 'auto'
      document.body.style.userSelect = 'auto'
      document.removeEventListener('keydown', preventKeydown)
    }
  }, [loading])

  return loading.length ? <div className="loading-indicator"><Spin size="large" /></div> : null
}

export default LoadingIndicator
