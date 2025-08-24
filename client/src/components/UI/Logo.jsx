import React from "react";

const Logo = ({ size = "20px", className = "" }) => {
  return (
    <div className={` text-sky-700 ${className}`} style={{ fontSize: size }}>
      Memoize
      <p className="text-[10px] -mt-3 text-black">remeber every goal</p>
    </div>
  );
};

export default Logo;
