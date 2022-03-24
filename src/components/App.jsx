import React, { useEffect, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Route } from 'react-router-dom'
import { Spin } from 'antd'
import LoadingIndicator from './LoadingIndicator'
import Modals from './Modals'
import NavBar from './NavBar'
import MenuDrawer from './MenuDrawer'
import Refreshing from './Refreshing'
import { ROUTES } from '../constants'
import { LOGIN } from '../redux/actions/auth'
import { CLOSE_ALL_DIALOG } from '../redux/actions/ui'
import ErrorBoundary from './ErrorBoundary'
import NetworkStatus from './NetworkStatus'
import { isAuthenticated } from '../redux/selectors/auth'

const OrsDebug = React.lazy(() => import('../pages/Ors/Debug'))
const OrsWareHouse = React.lazy(() => import('../pages/Ors/Config/warehouse'))
const OrsRouter = React.lazy(() => import('../pages/Ors/Config/router'))
const OrsLeadTime = React.lazy(() => import('../pages/Ors/Config/importLeadTime'))
const SubmitDocPut = React.lazy(() => import('../pages/SubmitDocPut'))
const ReceivingSearchDoc = React.lazy(() => import('../pages/ReceivingSearchDoc'))
const ReceivingPicking = React.lazy(() => import('../pages/ReceivingPicking'))
const CheckStock = React.lazy(() => import('../pages/CheckStock'))
const OutboundReturn = React.lazy(() => import('../pages/OutboundReturn'))
const ProductDimension = React.lazy(() => import('../pages/ProductDimension'))
const OutboundReturnImport = React.lazy(() => import('../pages/OutboundReturnImport'))
const Arrange = React.lazy(() => import('../features/arrange'))
const PutAway = React.lazy(() => import('../features/putaway'))
const Classify = React.lazy(() => import('../features/classify'))
const ImportExternalPurchaseOrder = React.lazy(() => import('../features/importExternalOrder'))

function PrivateRoute({ children, ...rest }) {
  const authenticated = useSelector(isAuthenticated)

  return (
    <Route
      exact
      {...rest}
      render={() => {
        if (authenticated) return children

        sessionStorage.setItem('continue', window.location.href)
        window.location = '/login'

        return null
      }}
    />
  )
}

const App = () => {
  const { dialogs } = useSelector(state => state.ui)
  const dispatch = useDispatch()
  const history = useHistory()
  const attempted = useSelector(state => state.auth?.attempts)

  useEffect(() => {
    dispatch({ type: LOGIN, history })
  }, [])

  useEffect(() => {
    history.listen(() => {
      if (dialogs && dialogs.length) {
        dispatch({
          type: CLOSE_ALL_DIALOG,
        })
      }

      if (window.gtag && window.gaId) {
        window.gtag('config', window.gaId, {
          page_path: location.pathname + location.hash,
        })
      }
    })
  }, [])

  // not render until trying to login at least once
  // by useEffect, otherwise it will always redirected
  // to login page because user is trying to access private
  // route while not logging in.
  return attempted ? (
    <ErrorBoundary>
      { window._env_?.FRONTEND_ENVIRONMENT ? <Refreshing /> : null }
      <LoadingIndicator />
      <section className="container">
        <NetworkStatus />
        <nav>
          <MenuDrawer />
          <NavBar />
        </nav>
        <main>
          <Modals />
          {/* lazy-loading by route-based code splitting
            https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
           */}
          <Suspense fallback={<div className="loading-indicator"><Spin size="large" /></div>}>
            <Route exact path="/">
              <div className="text-center">
                Homepage is comming soon!
              </div>
            </Route>
            <Route path={ROUTES.ORS_DEBUG}>
              <OrsDebug />
            </Route>
            <Route path={ROUTES.ORS_CONFIG_BY_WAREHOUSE}>
              <OrsWareHouse />
            </Route>
            <Route path={ROUTES.ORS_CONFIG_BY_ROUTER}>
              <OrsRouter />
            </Route>
            <Route path={ROUTES.ORS_CONFIG_BY_DELIVERY_LEAD_TIME}>
              <OrsLeadTime />
            </Route>
            <PrivateRoute exact path={ROUTES.SUBMIT_DOC_PUT}>
              <SubmitDocPut />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.RECEIVING_SEARCH_DOC}>
              <ReceivingSearchDoc />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.RECEIVING_PICKING}>
              <ReceivingPicking />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.CHECK_STOCK}>
              <CheckStock />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.OUTBOUND_RETURN}>
              <OutboundReturn />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.PRODUCT_DIMENSION}>
              <ProductDimension />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.OUTBOUND_RETURN_IMPORT}>
              <OutboundReturnImport />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.ARRANGE}>
              <Arrange />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.CLASSIFY}>
              <Classify />
            </PrivateRoute>
            <PrivateRoute path={ROUTES.PUT_AWAY}>
              <PutAway />
            </PrivateRoute>
            <Route path={ROUTES.IMPORT_EXTERNAL_ORDER}>
              <ImportExternalPurchaseOrder />
            </Route>
          </Suspense>
        </main>
      </section>
    </ErrorBoundary>
  ) : null
}

export default App
