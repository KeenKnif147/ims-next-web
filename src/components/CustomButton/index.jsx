import { Button } from 'antd'
import classNames from 'classnames'
import React, { memo } from 'react'
import { logButton } from '../../redux/middleware/submitDoc-dimension-amplitude'

const CustomButton = ({
  type,
  fullWidth,
  onClick,
  loading,
  helperText,
  children,
  disabled,
  show = true,
  placement,
  style,
  className,
  logText,
  ...rest
}) => {
  let content = children

  if (!show) return null

  if (loading) content = 'Đang xử lý'

  return (
    <Button
      {...rest}
      disabled={loading || disabled}
      style={{
        width: fullWidth ? '100%' : 'initial',
        ...style,
      }}
      className={classNames(`${type}-button`, className)}
      onClick={e => {
        if (typeof content === 'string' || logText) logButton(logText || content)
        if (typeof onClick === 'function') onClick(e)
      }}
    >
      {content}
    </Button>
  )
}

export default memo(CustomButton)
