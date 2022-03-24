import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import {
  Icon,
  Drawer,
  Menu,
} from 'antd'
import { LOGOUT } from '../../redux/actions/auth'
import { isAuthenticated, getUserInfo } from '../../redux/selectors/auth'
import './styles.less'
import menu from '../Menu'

const { SubMenu } = Menu

const MenuDrawer = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const userInfo = useSelector(getUserInfo)
  const authenticated = useSelector(isAuthenticated)

  const handleLogout = () => {
    dispatch({ type: LOGOUT, history })
    setVisible(false)
  }

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <div>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          defaultOpenKeys={['sub1']}
          style={{ height: '100vh', borderRight: 0 }}
          selectedKeys={[location.pathname]}
        >
          {menu.map((subMenu, index) => {
            const { title, items } = subMenu
            return (
              <SubMenu
                onClick={onClose}
                title={title}
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
              >
                {items?.map(item => (
                  <Menu.Item key={item.url?.replace('/v2/#', '')}>
                    {item.url.includes('/v2') ? <Link to={item.url?.replace('/v2/#', '')}>{item.title}</Link> : <a href={item.url}>{item.title}</a>}
                  </Menu.Item>
                ))}
              </SubMenu>
            )
          })}
          {authenticated ? (
            <SubMenu
              key="sub6"
              title={(
                <span>
                  <Icon type="laptop" />
                Xin chào {userInfo.username} ({userInfo.primary_wh})
                </span>
            )}
            >
              <Menu.Item key="1" onClick={handleLogout}>Đăng xuất</Menu.Item>
            </SubMenu>
          ) : (
            <Menu.Item key="login">
              <span>
                <Icon type="user" />
                <a href="/login" style={{ color: 'inherit' }}>Đăng nhập</a>
              </span>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>
      <button type="button" onClick={showDrawer} className="drawer-handler">
        <span />
        <span />
        <span />
      </button>
    </div>
  )
}

export default MenuDrawer
