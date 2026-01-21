import React from 'react';

interface TopbarProps {
  title?: string;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  className?: string;
}

const Topbar: React.FC<TopbarProps> = ({ title, rightContent, leftContent, className }) => {
  return (
    <header className={`w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm ${className || ''}`}>
      <div className="flex items-center gap-2">
        {leftContent}
        {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
      </div>
      <div className="flex items-center gap-2">
        {rightContent}
      </div>
    </header>
  );
};

export default Topbar;
