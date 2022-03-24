import React, {
  useState, useCallback, useRef, useEffect,
} from 'react'
import {
  Popover,
} from 'antd'
import Overlay from '../Overlay'
import FloatMenu from '../FloatMenu'
import './styles.less'

const styles = {
  bottom: {
    position: 'fixed',
    bottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    left: '0',
    right: '0',
  },
}

const Fab = ({ children, title, position }) => {
  const [fabOpen, setFabOpen] = useState(false)
  const fab = useRef()
  const lastScrollTop = useRef(0)
  const closeFab = useCallback(() => {
    setFabOpen(false)
  }, [])

  const handleScroll = () => {
    const st = window.pageYOffset || document.documentElement.scrollTop

    if (st > lastScrollTop.current) {
      // scroll down
      fab.current.style.bottom = `-${fab.current.offsetHeight + 10}px`
    } else {
      // scroll up
      fab.current.style.bottom = '10px'
    }

    lastScrollTop.current = st <= 0 ? 0 : st
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const childs = React.Children.map(children, child => child && React.cloneElement(child, { closeFab }))

  return (
    <div className="fab-button" style={{ ...styles[position], transition: 'all 0.2s' }} ref={fab}>
      <Overlay visible={fabOpen} close={closeFab} />
      <Popover
        title={title}
        content={(
          <FloatMenu>
            {childs}
          </FloatMenu>
        )}
        visible={fabOpen}
      >
        <button type="button" className={fabOpen ? 'active' : ''} onClick={() => setFabOpen(!fabOpen)}>
          <span />
          <span />
          <span />
        </button>
      </Popover>
    </div>
  )
}

const Item = ({
  icon, children, onClick, closeFab,
}) => {
  const handleClick = () => {
    onClick()
    closeFab()
  }
  return (<FloatMenu.Item onClick={handleClick} icon={icon}>{children}</FloatMenu.Item>)
}

const FabMemo = React.memo(Fab)

FabMemo.Item = React.memo(Item)

export default FabMemo
