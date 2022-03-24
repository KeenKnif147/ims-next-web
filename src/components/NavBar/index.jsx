import { Menu, Icon } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import menu from '../Menu'
import { LOGOUT } from '../../redux/actions/auth'
import ResponsiveLayout from '../ResponsiveLayout'
import './styles.less'
import { getUserInfo, isAuthenticated } from '../../redux/selectors/auth'

const { SubMenu } = Menu

const NavBar = withRouter(({ location, history }) => {
  const dispatch = useDispatch()
  const userInfo = useSelector(getUserInfo)
  const authenticated = useSelector(isAuthenticated)

  const handleLogout = () => dispatch({
    type: LOGOUT,
    history,
  })

  return (
    <div className="navbar-container">
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{ overflowY: 'scroll' }}
      >
        {menu.map((subMenu, index) => {
          const { title, items } = subMenu
          return (
            <SubMenu
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
      </Menu>
      <div>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
        >
          {authenticated
            ? (
              <SubMenu
                key="sub6"
                title={(
                  <span>
                    <Icon type="user" />
                Xin chào {userInfo.username} ({userInfo.primary_wh}) <Icon type="down" />
                  </span>
              )}
              >
                <Menu.Item key="19" onClick={handleLogout}>Đăng xuất</Menu.Item>
              </SubMenu>
            ) : (
              <Menu.Item key="login">
                <a href="/login" style={{ color: 'inherit' }}><Icon type="user" /> Đăng nhập</a>
              </Menu.Item>
            )}
        </Menu>
      </div>
    </div>
  )
})

export default () => <ResponsiveLayout desktop={<NavBar />} />
