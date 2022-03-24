import classNames from "classnames";
import React, { memo } from "react";

const Message = ({ children, show = true, type, className, ...rest }) => {
  if (!children || !show) return null;
  let textColorClassName = "text-rose-600";
  switch (type) {
    case "danger":
      textColorClassName = "text-rose-600";
      break;

    default:
      break;
  }
  return (
    <div
      className={classNames(`text-pre-wrap ${textColorClassName}`, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default memo(Message);
