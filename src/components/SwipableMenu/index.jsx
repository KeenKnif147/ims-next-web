import React, {
  useRef, useCallback,
} from 'react'

const STATE_DEFAULT = 1
const STATE_LEFT_SIDE = 2

const SwipableMenu = ({ children }) => {
  const swipableMenu = useRef(null)
  const initialTouchPos = useRef(null)
  const lastTouchPos = useRef(null)
  const rafPending = useRef(false)
  const itemWidth = useRef(0)
  const slopValue = useRef(0)
  const currentState = useRef(STATE_DEFAULT)
  const currentXPosition = useRef(0)

  const measuredRef = useCallback(node => {
    if (node !== null) {
      itemWidth.current = node.clientWidth
      slopValue.current = node.clientWidth * (1 / 8)
    }

    swipableMenu.current = node
  }, [])

  const getGesturePointFromEvent = (evt) => {
    const point = {}

    if (evt.targetTouches) {
      // Prefer Touch Events
      point.x = evt.targetTouches[0].clientX
      point.y = evt.targetTouches[0].clientY
    } else {
      // Either Mouse event or Pointer Event
      point.x = evt.clientX
      point.y = evt.clientY
    }

    return point
  }

  function updateSwipeRestPosition() {
    const differenceInX = initialTouchPos.current.x - lastTouchPos.current.x

    currentXPosition.current -= differenceInX

    if (differenceInX === 0) {
      currentState.current = STATE_DEFAULT
    }

    // Check if we need to change state to left based on slop value
    if (Math.abs(differenceInX) > slopValue.current) {
      if (currentState.current === STATE_DEFAULT) {
        if (differenceInX > 0) {
          currentState.current = STATE_LEFT_SIDE
        }
      } else if (currentState.current === STATE_LEFT_SIDE && differenceInX <= 0) {
        currentState.current = STATE_DEFAULT
      }
    }

    swipableMenu.current.style.transition = 'all 150ms ease-out'

    switch (currentState.current) {
      case STATE_DEFAULT:
        currentXPosition.current = 0
        break
      case STATE_LEFT_SIDE:
        currentXPosition.current = -(itemWidth.current - (itemWidth.current / 1.5))
        break
      default: currentXPosition.current = 0
    }

    const transformStyle = `translateX(${currentXPosition.current}px)`

    swipableMenu.current.style.msTransform = transformStyle
    swipableMenu.current.style.MozTransform = transformStyle
    swipableMenu.current.style.webkitTransform = transformStyle
    swipableMenu.current.style.transform = transformStyle
  }

  function onAnimFrame() {
    if (!rafPending.current) {
      return
    }

    const differenceInX = initialTouchPos.current.x - lastTouchPos.current.x

    const newXTransform = `${currentXPosition.current - differenceInX}px`
    const transformStyle = `translateX(${newXTransform})`

    swipableMenu.current.style.webkitTransform = transformStyle
    swipableMenu.current.style.MozTransform = transformStyle
    swipableMenu.current.style.msTransform = transformStyle
    swipableMenu.current.style.transform = transformStyle

    rafPending.current = false
  }

  const handleGestureMove = (evt) => {
    if (!initialTouchPos) {
      return
    }

    lastTouchPos.current = getGesturePointFromEvent(evt)

    if (rafPending.current) {
      return
    }

    rafPending.current = true

    window.requestAnimationFrame(onAnimFrame)
  }

  const handleGestureEnd = (evt) => {
    if (evt.touches && evt.touches.length > 0) {
      return
    }

    rafPending.current = false

    // Remove Event Listeners
    // if (window.PointerEvent) {
    //   evt.target.releasePointerCapture(evt.pointerId)
    // }

    updateSwipeRestPosition()
    initialTouchPos.current = null
  }

  const handleGestureStart = (evt) => {
    if (evt.touches && evt.touches.length > 1) {
      return
    }

    // if (window.PointerEvent) {
    //   evt.target.setPointerCapture(evt.pointerId)
    // }

    initialTouchPos.current = getGesturePointFromEvent(evt)

    swipableMenu.current.style.transition = 'initial'
  }

  return (
    <>
      {/* {window.PointerEvent ? (
        <div
          style={{ touchAction: 'none' }}
          ref={measuredRef}
          onPointerDown={handleGestureStart}
          onPointerMove={handleGestureMove}
          onPointerUp={handleGestureEnd}
          onPointerCancel={handleGestureEnd}
        >{children}
        </div>
      ) : (
        <div
          style={{ touchAction: 'none' }}
          ref={measuredRef}
          onTouchStart={handleGestureStart}
          onTouchMove={handleGestureMove}
          onTouchEnd={handleGestureEnd}
          onTouchCancel={handleGestureEnd}
        >{children}
        </div>
      )} */}
      <div
        ref={measuredRef}
        onTouchStart={handleGestureStart}
        onTouchMove={handleGestureMove}
        onTouchEnd={handleGestureEnd}
        onTouchCancel={handleGestureEnd}
      >{children}
      </div>
    </>
  )
}

export default React.memo(SwipableMenu)
