import React from 'react'
import { Tooltip, Icon } from 'antd'
import './styles.less'

const LabelWithTooltip = ({ children, tooltip, className }) => (
  <div className={`label-with-tooltip ${className}`}>
    <div className="flex aligner-items-start">
      <span className="label-with-tooltip-label">{children}</span>
      <Tooltip placement="bottom" title={tooltip}>
        <Icon className="label-with-tooltip-icon" type="info" />
      </Tooltip>
    </div>
  </div>
)

export default React.memo(LabelWithTooltip)
