import React, { useCallback, useRef } from 'react'
import { Input as AntInput } from 'antd'

const makeField = Component => React.forwardRef(({
  input,
  meta,
  children,
  hasFeedback,
  label,
  onFocus,
  onPaste,
  onInput,
  onKeyDown,
  hideKeyboard = true,
  selectOnFocus = true,
  onPressEnter,
  selectAfterEnter = true,
  preventTyping,
  autoComplete = 'off',
  ...rest
}, forwardedRef) => {
  const timer = useRef()
  const counter = useRef(0)
  const selfRef = useRef()
  const ref = forwardedRef || selfRef
  const shouldPreventTyping = preventTyping && window._env_ && ['production', 'staging'].includes(window._env_.FRONTEND_ENVIRONMENT)

  const handleEnter = useCallback(event => {
    if (typeof onPressEnter === 'function') {
      onPressEnter(event)
    }

    if (selectAfterEnter) {
      event.target.select()
    }
  }, [onPressEnter])

  const handleFocus = useCallback(event => {
    if (typeof onFocus === 'function') {
      onFocus(event)
    }

    if (selectOnFocus) {
      event.target.select()
    }

    if (hideKeyboard) {
      const e = document.activeElement

      e.setAttribute('readonly', 'readonly')

      setTimeout(() => {
        e.removeAttribute('readonly')
      }, 200)
    }
  }, [])

  const handleInput = useCallback(event => {
    if (typeof onInput === 'function') {
      onInput(event)
    }

    counter.current += event.nativeEvent?.data?.length || 0
    if (shouldPreventTyping) {
      // Algorithm: Every 400ms, check if the length of input
      // value (by onChange event) is >= 3
      // if yes => scanner, else => human. The counter and timer
      // will reset every 200ms. If the input key is enter => stop checking.
      // Input after timer stopped will trigger the timer again
      if (!timer.current) {
        timer.current = setTimeout(() => {
          if (counter.current < 3) {
            ref.current.handleReset('')
          }

          timer.current = null
          counter.current = 0
        }, 400)
      }
    }
  }, [shouldPreventTyping])

  const handlePaste = useCallback(event => {
    if (typeof onPaste === 'function') {
      onPaste(event)
    }

    if (shouldPreventTyping) event.preventDefault()
  }, [preventTyping])

  const handleKeyDown = useCallback(e => {
    if (typeof onKeyDown === 'function') {
      onKeyDown(e)
    }

    if (preventTyping && (e.keyCode === 13 || e.keyCode === 0)) {
      clearTimeout(timer.current)
      timer.current = null
      counter.current = 0
    }
  }, [preventTyping])

  return (
    <Component
      {...input}
      {...rest}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onFocus={handleFocus}
      onInput={handleInput}
      onPressEnter={handleEnter}
      children={children}
      autoComplete={autoComplete}
      ref={ref}
    />
  )
})

export const Input = makeField(AntInput)
export const InputPassword = makeField(AntInput.Password)
export const InputSearch = makeField(AntInput.Search)
