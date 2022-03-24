import React, { useEffect } from 'react'
import { Icon, Typography } from 'antd'

const { Text } = Typography

const Step = ({
  onEnter, onLeave, children, handleBack, title, style,
}) => {
  useEffect(() => {
    if (typeof onEnter === 'function') onEnter()

    return () => typeof onLeave === 'function' && onLeave()
  }, [])

  return (
    <div className="mobile-card step-input" style={style}>
      <div className="flex-row flex-space-between" style={{ marginBottom: 8, fontSize: 16 }}>
        {handleBack && <a onClick={handleBack}><Icon type="left" style={{ marginRight: 3 }} />Back</a>}
        <Text strong>{title}</Text>
      </div>
      {children}
    </div>
  )
}

export default Step
