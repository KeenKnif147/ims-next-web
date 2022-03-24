import React, { memo } from 'react'

const Separator = ({ height, width, show = true }) => {
  if (!show) return null

  let style = {}
  height && (style = {
    height,
    width: '100%',
  })
  width && (style = {
    width,
    height: '100%',
  })

  return (
    <div style={style} />
  )
}

export default memo(Separator)
