import React, { useState, useRef } from 'react';
import './TooltipMudi.css';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left"; // position of the tooltip relative to the child
 visible:boolean
}

const TooltipMudi: React.FC<TooltipProps> = ({ content, children,visible=false, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const ref = useRef<HTMLDivElement | null>(null);

  const getTooltipStyle = (): React.CSSProperties => {
    if (!ref.current) return {};

    const rect = ref.current.getBoundingClientRect();
    switch (position) {
      case "top":
        return {
          top: `-46px`,
          width: "100%"
        };
      case "right":
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right}px`,
          transform: 'translateY(-50%)',
          width: "100%"
        };
      case "bottom":
        return {
          top: `${rect.bottom}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translateX(-50%)',
          width: "100%"
        };
      case "left":
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left - 30}px`,
          transform: 'translateY(-50%)',
          width: "100%"
        };
      default:
        return {};
    }
  };

  return (
    <div 
      ref={ref}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ position: 'relative', width: "100%" }}
    >
      {children}
      {isVisible && (
        <div className="tooltip-content-Mudi" style={getTooltipStyle()}>
          {content}
        </div>
      )}
    </div>
  );
};

export default TooltipMudi;
