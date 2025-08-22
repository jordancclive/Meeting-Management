import React from 'react';
interface IconButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}
export const IconButton = ({
  icon,
  tooltip,
  onClick
}: IconButtonProps) => {
  return <div className="relative group">
      <button className="rounded-full p-1.5 hover:bg-gray-100 flex items-center justify-center" onClick={onClick} aria-label={tooltip}>
        {icon}
      </button>
      <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 top-full left-1/2 transform -translate-x-1/2 translate-y-1 w-max max-w-[150px] text-center">
        {tooltip}
      </div>
    </div>;
};