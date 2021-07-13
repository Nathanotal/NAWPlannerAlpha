import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function HomeIcon({ size, color }) {
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
      className="feather feather-home"
      viewBox="0 0 24 24"
      color={color}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
      <path d="M9 22L9 12 15 12 15 22"></path>
    </svg>
  );
}

export default HomeIcon;
