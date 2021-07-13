import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function SquareIcon({ size }) {
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
      className="feather feather-square"
      viewBox="0 0 24 24"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
    </svg>
  );
}

export default SquareIcon;
