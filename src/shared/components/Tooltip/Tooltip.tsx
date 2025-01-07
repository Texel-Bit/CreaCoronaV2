import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Tooltip.css';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, visible }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 }); 
  const childRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
  };

  useEffect(() => {
    if (visible) calculatePosition();
  }, [visible]);

  return (
    <div
      ref={childRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {
        ReactDOM.createPortal(
          <div
           
            className="tooltipMudi"
          >
            {content}
          </div>,
          document.body 
        )}
    </div>
  );
};

export default Tooltip;
