import React, { useEffect, useState } from "react";
import "./mosaic-hexagon.css";

interface ExperienceMosaicHexagonProps {
  hexagon: HTMLElement; // Assuming this contains your SVG hexagon markup
  grout: string;
}

export const MosaicHexagon: React.FC<ExperienceMosaicHexagonProps> = (props) => {
  const [groutImageCss, setGroutImageCss] = useState("");

  useEffect(() => {
    setGroutImageCss(props.grout ? `background-image: url(${props.grout})` : "");
  }, [props.grout]);

  return (
    <div id="mosaic-element" className="mosaic-hexagon">
      <style>
        {`
          .mosaic-hexagon {
            width: 329px; 
            height: 378px !important;
            display: flex;
            justify-content: center;
            align-items: start;
            flex-direction: row;
            ${groutImageCss}
          }

          .hexagon-column {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }



          .hexagon {
            width: 219px; 
            height: 189px; 
            display: flex;
            justify-content: center;
            align-items: center; 
            scale:97%
          }

          .hexagon svg {
            width: 100%;
            height: auto;
            display: block;
          }

          // Adjustments for first and last hexagon in column 1 and 3 for vertical centering
          .hexagon-column-1 .hexagon:first-child,
          .hexagon-column-3 .hexagon:first-child {

          }

          .hexagon-column-1 .hexagon:last-child,
          .hexagon-column-3 .hexagon:last-child {

          }

          .hexagon-column-1 {
            transform: translateX(54.75px);
          }
          .hexagon-column-2 {
            transform: translateY(-94.5px);
          }
          .hexagon-column-3 {
            transform: translateX(-54.75px);
          }
        `}
      </style>

      <div className="hexagon-column hexagon-column-1">
        {/* Column 1 - Two hexagons */}
        <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }} />
        <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }} />
      </div>

      <div className="hexagon-column hexagon-column-2">
        {/* Column 2 - Three hexagons */}
        <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }} />
        <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }} />
        <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }} />
      </div>

      <div className="hexagon-column hexagon-column-3">
        {/* Column 3 - Two hexagons */}
        <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }} />
        <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }} />
      </div>
    </div>
  );
};
