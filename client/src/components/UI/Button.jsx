import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button className={`py-2 px-6 rounded border shadow cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
