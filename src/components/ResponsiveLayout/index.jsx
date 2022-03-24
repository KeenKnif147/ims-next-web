import React from 'react'
import Media from 'react-media'

const ResponsiveLayout = ({ mobile = null, desktop = null }) => (
  <Media query="(max-width: 959px)">
    {smallScreen => (
      smallScreen ? mobile : desktop
    )}
  </Media>
)

export default ResponsiveLayout
