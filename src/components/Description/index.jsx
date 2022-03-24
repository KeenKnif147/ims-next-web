import React from 'react'
import './styles.less'

const Description = ({ children, style }) => (
  <div className="description" style={style}>
    <div style={{ display: 'table', width: '100%' }}>
      {children}
    </div>
  </div>
)

const Item = ({ label, children }) => (
  <div style={{ display: 'table-row' }}>
    <div style={{ display: 'table-cell', wordBreak: 'break-word', width: '1%' }}>
      <div className="description-title">
        {label}
      </div>
    </div>
    <div style={{ display: 'table-cell', wordBreak: 'break-word' }}>
      {children}
    </div>
  </div>
)

Description.Item = Item

export default Description
