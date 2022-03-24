import React, { useMemo } from 'react'
import Step from './Step'

const Steps = ({ children, current = 0, title }) => {
  const stepTemplates = useMemo(() => {
    const templates = []

    React.Children.forEach(children, child => {
      if (child.type !== Step) {
        throw new TypeError('Steps children must be Step components')
      }

      templates.push(React.cloneElement(child, { title }))
    })

    return templates
  }, [children])

  return stepTemplates[current] || null
}

Steps.Step = Step

export default Steps
