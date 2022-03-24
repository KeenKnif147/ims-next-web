import React from 'react'
import { Icon } from 'antd'
import './styles.less'

const FloatMenu = ({ children }) => (
  <div className="float-menu">
    {children}
  </div>
)

const Item = ({ icon, children, onClick }) => (
  <div onClick={onClick}><Icon type={icon} /><span>{children}</span></div>
)

const FloatMenuMemo = React.memo(FloatMenu)

FloatMenuMemo.Item = React.memo(Item)

export default FloatMenuMemo
