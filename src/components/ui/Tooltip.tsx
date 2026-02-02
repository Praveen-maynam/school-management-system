import React, { useState, useRef } from 'react';
import clsx from 'clsx';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  children: React.ReactElement<any>;
}

/**
 * Tooltip component supporting positions, delay, ARIA accessibility, and custom className.
 * @param {TooltipProps} props - Tooltip props
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 200,
  className,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
    timeout.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setVisible(false);
  };

  const positions: Record<TooltipPosition, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <span className="relative inline-block" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {React.cloneElement(children, { 'aria-describedby': visible ? 'tooltip' : undefined })}
      {visible && (
        <span
          id="tooltip"
          role="tooltip"
          className={clsx(
            'absolute z-20 px-3 py-1.5 rounded bg-gray-900 text-white text-xs shadow transition-opacity duration-150 opacity-100 pointer-events-none',
            positions[position],
            className
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
