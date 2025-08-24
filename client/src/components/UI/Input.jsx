import React, { useId, forwardRef } from "react";

const Input = ({ label, type, className = "", ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block my-2">
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        id={id}
        {...props}
        className={`w-full border shadow-lg outline-none p-2 rounded-full ${className}`}
      />
    </div>
  );
};

export default forwardRef(Input);
