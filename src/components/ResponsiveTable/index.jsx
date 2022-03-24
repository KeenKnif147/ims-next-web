import React from 'react'
import { Table } from 'antd'
import Media from 'react-media'
import './styles.less'

// Columns with hideOnSmall: true
// will be hidden on small screen (PDA device)
const ResponsiveTable = ({ columns, ...rest }) => {
  const getResponsiveColumns = smallScreen => (
    columns.filter(({ hideOnSmall = false }) => !(smallScreen && hideOnSmall))
  )

  return (
    <div className="responsive-table">
      <Media query="(max-width: 576px)">
        {smallScreen => (
          <Table
            {...rest}
            columns={getResponsiveColumns(smallScreen)}
          />
        )}
      </Media>
    </div>
  )
}

export default ResponsiveTable
