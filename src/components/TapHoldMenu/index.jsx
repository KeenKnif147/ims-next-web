import React, { useRef, useCallback, useState } from 'react'
import Overlay from '../Overlay'
import FloatMenu from '../FloatMenu'

const TapHoldMenu = ({ children }) => {
  const tapHoldTimer = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleTouchStart = () => {
    tapHoldTimer.current = setTimeout(() => {
      setMenuOpen(true)
    }, 300)
  }

  const handleTouchEnd = () => {
    if (tapHoldTimer.current) {
      clearTimeout(tapHoldTimer.current)
      tapHoldTimer.current = null
    }
  }

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <Overlay visible={menuOpen} close={closeMenu} />
      <FloatMenu>
        <FloatMenu.Item>asdsa</FloatMenu.Item>
        <FloatMenu.Item>asdsa</FloatMenu.Item>
      </FloatMenu>
      <div
        style={{ userSelect: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchEnd}
      >
        {children}
      </div>
    </>
  )
}

export default TapHoldMenu
