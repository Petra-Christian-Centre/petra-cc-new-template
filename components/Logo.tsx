import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 89, height = 89, className }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 89 89" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect 
        x="12" 
        y="12" 
        width="64.5" 
        height="64.5158" 
        fill="black"
      />
    </svg>
  );
};

export default Logo; 