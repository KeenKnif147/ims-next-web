import React, { useEffect, useRef } from 'react'
import { useHistory, Prompt as RoutePrompt } from 'react-router-dom'
import { Modal } from 'antd'

const Prompt = ({ title, content, when }) => {
  const history = useHistory()
  const confirmNavigate = useRef(false)

  useEffect(() => {
    const unloadHandler = e => {
      e.preventDefault()

      e.returnValue = content
    }

    if (when) {
      window.onbeforeunload = unloadHandler
    }

    return () => { window.onbeforeunload = null }
  }, [when, content])

  return (
    <RoutePrompt
      when={Boolean(when)}
      message={({ pathname }) => {
        if (confirmNavigate.current) {
          confirmNavigate.current = false

          return true
        }

        // Do not use getUserConfirmation because react-router issue
        // https://github.com/ReactTraining/react-router/issues/5405
        Modal.confirm({
          title,
          content,
          onOk: () => {
            confirmNavigate.current = true
            // TODO: this will misbehave when user actually click back
            // and forward on browser while we still understand it as
            // a PUSH -> click on Back button will actually do a PUSH
            // -> can not go forward after go back
            history.push(pathname)
          },
        })

        return false
      }}
    />
  )
}

export default React.memo(Prompt)
