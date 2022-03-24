import React, { memo, useState, useEffect } from 'react'
import { useNetwork } from 'react-use'
import './style.css'

const NetworkStatus = () => {
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const network = useNetwork()
  const { online, effectiveType } = network || {}

  useEffect(() => {
    if (network?.online == null) return

    if (!online) {
      setMessage('Không có kết nối mạng')
      setType('danger')
      return
    }

    if (['4g', '3g'].includes(effectiveType)) {
      setMessage('')
      setType('')
      return
    }
    setMessage('Mạng không ổn định')
    setType('warning')
  }, [online, effectiveType])

  if (!message) return null
  return (
    <div
      className={`network-container ${type}-button text-center font-smaller width-100`}
    >
      <div>
        {message}
      </div>
    </div>
  )
}

export default memo(NetworkStatus)
