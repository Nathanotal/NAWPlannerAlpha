import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function MinusIcon({ size }) {
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
      className="feather feather-minus"
      viewBox="0 0 24 24"
    >
      <path d="M5 12L19 12"></path>
    </svg>
  );
}

export default MinusIcon;
