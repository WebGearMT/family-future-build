import React from "react";

interface MobileSearchIconProps {
  onClick: () => void;
}

export const MobileSearchIcon: React.FC<MobileSearchIconProps> = ({
  onClick,
}) => {
  return (
    <div className="mobile-search-icon" onClick={onClick}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.7063 17.8187H19.6938L25.9314 24.0687L24.0688 25.9313L17.8188 19.6937V18.7062L17.4813 18.3562C16.0563 19.5812 14.2063 20.3187 12.1938 20.3187C7.7064 20.3187 4.06885 16.6812 4.06885 12.1937C4.06885 7.70626 7.7064 4.06875 12.1938 4.06875C16.6813 4.06875 20.3188 7.70626 20.3188 12.1937C20.3188 14.2062 19.5813 16.0562 18.3565 17.4812L18.7063 17.8187ZM6.56885 12.1937C6.56885 15.3062 9.08136 17.8187 12.1938 17.8187C15.3063 17.8187 17.8188 15.3062 17.8188 12.1937C17.8188 9.08126 15.3063 6.56875 12.1938 6.56875C9.08136 6.56875 6.56885 9.08126 6.56885 12.1937Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
