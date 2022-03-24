import React from 'react'
import { Icon } from 'antd'
import CustomButton from '../CustomButton'

const ActionButton = ({
  icon,
  text,
  type,
  expand,
  onClick,
  disabled,
}) => (
  <CustomButton type={type} onClick={onClick} disabled={disabled}>
    <Icon type={icon} />
    {expand && text}
  </CustomButton>
)

export default ActionButton
