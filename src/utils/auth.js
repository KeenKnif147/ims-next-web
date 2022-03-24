export const getAuthInfoFromCookie = () => {
  const cookiesObj = {}
  const cookies = document.cookie
  const cookiesArr = cookies.split('; ')

  cookiesArr.forEach(cookie => {
    const [key, value] = cookie.split('=')

    cookiesObj[key] = value
  })

  const { user_id, username, primary_wh } = cookiesObj

  return { user_id, username, primary_wh }
}

const clearAuthCookies = () => {
  ['primary_wh', 'warehouse', 'user_id', 'platform', 'access_rule_vue', 'role_name', 'username', 'token'].forEach(key => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`
  })
}

const clearAuthLocalStorage = () => {
  const keys = ['primary_wh', 'warehouse', 'user_id', 'platform', 'access_rule_vue', 'role_name', 'username', 'token']

  keys.forEach(key => localStorage.removeItem(key))
}

export const clearAuthInfo = () => {
  clearAuthCookies()
  clearAuthLocalStorage()
}
