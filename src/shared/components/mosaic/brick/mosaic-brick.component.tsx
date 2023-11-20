import { useEffect, useState } from "react";
import Singleton from "../../../../core/patterns/singleton";

interface ExperienceMosaicBricksProps {
  brick: HTMLElement;
  grout: string;
  rotated: boolean;
}

export const MosaicBrick: React.FC<ExperienceMosaicBricksProps> = ({ brick, grout, rotated }) => {
  // State to keep track of bonding pattern and number of rows
  const [isBondPattern, setIsBondPattern] = useState(true);
  const [numberOfRows, setNumberOfRows] = useState(0);
  // State to hold the brick style
  const [brickStyle, setBrickStyle] = useState("");

  useEffect(() => {
    // Create style based on grout and rotation
    let newBrickStyle = grout ? `background-image: url(${grout});` : "";
    if (rotated) newBrickStyle += "transform: rotate(90deg)";

    setBrickStyle(newBrickStyle);

    // Fetch the selected format from the singleton
    const selectedFormat = Singleton.getInstance().currentFormat;

    // Check if the bonding pattern should be used
    const useBondPattern = !selectedFormat || selectedFormat.id === 1;

    // Update state
    setIsBondPattern(useBondPattern);
    setNumberOfRows(useBondPattern ? 6 : 4);
  }, [brick, grout, rotated]);

  // Helper function to render individual rows
  const renderRow = (isOffset: boolean, key: string) => (
    <div key={key} className={isOffset ? "brick-row-offset" : "brick-row"}>
      <div dangerouslySetInnerHTML={{ __html: brick.outerHTML }}></div>
      <div dangerouslySetInnerHTML={{ __html: brick.outerHTML }}></div>
      {isOffset && <div dangerouslySetInnerHTML={{ __html: brick.outerHTML }}></div>}
    </div>
  );

  return (
    <div id="mosaic-element" className="mosaic-brick w-100">
      <style>
        {`
          .mosaic-brick {
            display: flex;
            flex-direction: column;
            gap: .3rem;
            padding: .1rem;
            overflow: hidden;
            ${brickStyle}
          }
          
          .brick-row, .brick-row-offset {
            display: grid;
            gap: .3rem;
          }

          .brick-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .brick-row-offset {
            width: 150%;
            grid-template-columns: repeat(3, 1fr);
            margin-left: -25%;
          }
        `}
      </style>

      {Array.from({ length: numberOfRows }).map((_, index) => {
        const isOffset = index % 2 !== 0 && isBondPattern;
        return renderRow(isOffset, `mosaicBrickRow${index}`);
      })}
    </div>
  );
};
