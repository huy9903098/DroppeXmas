import * as React from "react";

function SvgUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19.75 15.67a6 6 0 10-7.51 0A11 11 0 005 26v1h22v-1a11 11 0 00-7.25-10.33zM12 11a4 4 0 114 4 4 4 0 01-4-4zM7.06 25a9 9 0 0117.89 0z"
        fill="#0a1815"
        data-name="Layer 7"
      />
    </svg>
  );
}

export default SvgUser;
