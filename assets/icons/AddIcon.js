import React from "react";
import { useState, useEffect } from "react";

function AddIcon({ size, color }) {
  const [s, setS] = useState(24);

  useEffect(() => {
    if (size) {
      setS(size);
    }
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={s}
      height={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-plus-square"
      viewBox="0 0 24 24"
      color={color}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
      <path d="M12 8L12 16"></path>
      <path d="M8 12L16 12"></path>
    </svg>
  );
}

export default AddIcon;
