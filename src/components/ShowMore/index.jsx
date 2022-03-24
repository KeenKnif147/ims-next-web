import React, {
  useState, useEffect, useRef, useMemo,
} from 'react'
import { Icon } from 'antd'
import './styles.less'

const ShowMore = props => {
  const {
    children, initialHeight = 50, style, collapse, onCollapseChange,
  } = props
  const [collapsing, setCollapsing] = useState(collapse || true)
  const contentRef = useRef(null)
  const shouldCollapse = useMemo(() => {
    if ('collapse' in props) return collapse

    return collapsing
  }, [collapsing, collapse])

  useEffect(() => {
    if (shouldCollapse) {
      contentRef.current.style.maxHeight = `${initialHeight}px`
      contentRef.current.style.transition = 'all 0.4s cubic-bezier(0,1,0,1)'
    } else {
      contentRef.current.style.maxHeight = '1000px' // large enough number, larger than the content itself
      contentRef.current.style.transition = 'all 0.4s cubic-bezier(1,1,1,1)'
    }
  }, [collapsing, collapse])

  const handleCollapseToggle = () => {
    if (typeof onCollapseChange === 'function') {
      onCollapseChange(!shouldCollapse)
    }

    if (!('collapse' in props)) {
      setCollapsing(!shouldCollapse)
    }
  }

  return (
    <div style={style}>
      <div ref={contentRef} className="showmore-content">
        <div>{children}</div>
        <div onClick={handleCollapseToggle} className={`showmore-toggler ${shouldCollapse ? 'hide' : 'show'}`}>
          {shouldCollapse ? 'Hiển thị thêm' : 'Thu gọn'}
          <Icon type={shouldCollapse ? 'caret-down' : 'caret-up'} className="showmore-toggler-icon" />
        </div>
      </div>
    </div>
  )
}

export default React.memo(ShowMore)
