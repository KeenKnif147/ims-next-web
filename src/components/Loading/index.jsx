import { Spin } from 'antd'
import React, { useEffect } from 'react'
import './styles.less'

const Loading = () => {
  useEffect(() => {
    const preventKeydown = e => {
      e.preventDefault()
      return false
    }

    document.body.style.pointerEvents = 'none'
    document.body.style.userSelect = 'none'
    document.addEventListener('keydown', preventKeydown)

    return () => {
      document.body.style.pointerEvents = 'auto'
      document.body.style.userSelect = 'auto'
      document.removeEventListener('keydown', preventKeydown)
    }
  }, [])

  return (
    <div className="loading-indicator">
      <Spin size="large" />
    </div>
  )
}

export default Loading
