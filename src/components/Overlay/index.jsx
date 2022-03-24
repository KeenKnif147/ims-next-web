import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './styles.less'

const anchor = document.createElement('div')

anchor.id = 'overlay'

const Overlay = ({ visible, close }) => {
  useEffect(() => {
    document.body.appendChild(anchor)

    return () => document.body.removeChild(anchor)
  }, [visible])

  useEffect(() => {
    // Need to use class instead of setting style directly
    // because if there is an action that cause antd's modal
    // open and then close this overlay, the antd's style for
    // body element will be overriden by this setting because
    // this effect runs after antd's modal open runs.
    //
    // Using class will avoid it because the class style cannot
    // override antd's "element style" no matter this effect runs
    // after antd's modal open runs.
    if (visible) {
      document.body.classList.add('overflow-hidden')
      document.body.classList.remove('overflow-auto')
    } else {
      document.body.classList.remove('overflow-hidden')
      document.body.classList.add('overflow-auto')
    }
  }, [visible])

  const overlay = visible ? (
    <div
      className="overlay"
      style={{ display: visible ? 'block' : 'none' }}
      onClick={() => close()}
    />
  ) : null

  // https://reactjs.org/docs/portals.html
  return createPortal(
    overlay,
    anchor,
  )
}

export default React.memo(Overlay)
