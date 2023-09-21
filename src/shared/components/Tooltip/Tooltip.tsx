import React, { useState, useRef } from 'react';
import './Tooltip.css'
interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const childRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={childRef}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            {children}
            {isVisible && (
    <div
        style={{
            position: 'absolute',
            bottom: '-10px',   // starts a bit below the target
            left: '50%',
            transform: 'translateX(-50%) translateY(10px)', // translateY(10px) to move it further down initially
            backgroundColor: 'black',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            zIndex: 1,
            opacity: 0,
            transition: 'opacity 0.3s, transform 0.3s',  // Add this for animation
        }}
        className="tooltip-content"
    >
        {content}
    </div>
            )}
        </div>
    );
};

export default Tooltip;