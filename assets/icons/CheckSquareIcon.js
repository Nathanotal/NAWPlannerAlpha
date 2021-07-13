import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function CheckSquareIcon({ size }) {
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
      className="feather feather-check-square"
      viewBox="0 0 24 24"
    >
      <path d="M9 11L12 14 22 4"></path>
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
    </svg>
  );
}

export default CheckSquareIcon;
