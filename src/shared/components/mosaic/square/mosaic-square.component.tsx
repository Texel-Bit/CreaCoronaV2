import React, { useEffect, useState } from "react";

interface ExperienceMosaicSquareProps {
  squares: HTMLElement[];
  grout: string;
}

export const MosaicSquare: React.FC<ExperienceMosaicSquareProps> = ({ squares, grout }) => {
  // State to hold the background image CSS for grout
  const [groutBackgroundStyle, setGroutBackgroundStyle] = useState("");

  useEffect(() => {
    // Update the grout background style if grout is available
    if (grout) {
      setGroutBackgroundStyle(`background-image: url(${grout})`);
    }
  }, [grout, squares]);

  return (
    <div id="mosaic-element" className="mosaic-square w-100">
      {/* Inline styles */}
      <style>
        {`
          .mosaic-square {
            display: grid;
            gap: .28rem;
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: repeat(2, 1fr);
            padding: .14rem;
            ${groutBackgroundStyle}
          }
        `}
      </style>
      {/* Rendering squares */}
      {squares.map((square, index) => (
        <div
          key={`mosaic-square-key${index}`}
          className="img-container"
          dangerouslySetInnerHTML={{ __html: square.outerHTML }}
        ></div>
      ))}
    </div>
  );
};
