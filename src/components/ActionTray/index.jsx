import React, { useState } from 'react'
import ActionButton from '../ActionButton'
import './styles.less'

const ActionTray = ({ children }) => {
  const [expand, setExpand] = useState(false)

  // https://stackoverflow.com/questions/37521798/when-should-i-be-using-react-cloneelement-vs-this-props-children/50441271#50441271
  // We want to be able to use like:
  // <ActionTray>
  //   <ActionButton icon="sync" text="Repush" />
  //   <ActionButton icon="close" text="Cancel" />
  //   <ActionButton icon="check" text="Done" />
  // </ActionTray>
  // so we need to find a way to let ActionButton icon
  // knows when to expand itself. The expand logic
  // of all ActionButtons need to be controlled by
  // ActionTray, so this way we can pass the expand
  // data from ActionTray to its children, which is
  // ActionButton without having to lift the state
  // up or passing a list of button data and render
  // ActionButton inside ActionTray's render function
  const childrenWithExpand = React.Children.map(
    children,
    child => React.isValidElement(child) && React.cloneElement(child, { expand }),
  ).filter(Boolean)

  return (
    childrenWithExpand.length > 0 && (
      <div className="action-tray">
        {childrenWithExpand}
        <ActionButton
          icon={expand ? 'close' : 'question'}
          text="Help"
          expand={expand}
          onClick={() => setExpand(!expand)}
        />
      </div>
    )
  )
}

export default ActionTray
