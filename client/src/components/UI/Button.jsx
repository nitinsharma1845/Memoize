import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button className={`rounded border shadow cursor-pointer py-2 px-6  ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
