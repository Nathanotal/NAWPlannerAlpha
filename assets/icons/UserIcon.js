import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function UserIcon({ size, color }) {
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
      className="feather feather-user"
      viewBox="0 0 24 24"
      color={color}
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

export default UserIcon;
