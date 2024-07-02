import React from "react";

function Loading() {
  return (
    <div role="status" className="h-screen flex justify-center items-center">
      <svg
        aria-hidden="true"
        className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 50 51"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 0C11.193 0 0 11.193 0 25C0 38.807 11.193 50 25 50C38.807 50 50 38.807 50 25C50 11.193 38.807 0 25 0ZM4.542 25C4.542 13.315 13.315 4.542 25 4.542C36.685 4.542 45.458 13.315 45.458 25C45.458 36.685 36.685 45.458 25 45.458C13.315 45.458 4.542 36.685 4.542 25Z"
          fill="currentColor"
        />
        <path
          d="M45.31 19.522C46.61 19.123 47.322 17.691 46.925 16.391C45.393 11.419 42.242 6.975 37.856 3.48C33.471 0.041 28.081 -1.141 22.595 -0.053C18.833 0.681 14.941 1.936 11.42 3.613C9.908 4.342 9.257 6.141 9.986 7.654C10.715 9.168 12.514 9.819 14.027 9.091C17.087 7.574 20.279 6.505 23.507 6.06C27.598 5.499 31.621 6.36 35.118 8.516C38.615 10.671 41.474 13.995 43.33 18.007C44.07 19.544 46.016 20.045 45.31 19.522Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loading;
