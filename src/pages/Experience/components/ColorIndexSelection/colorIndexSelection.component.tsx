import React, { useEffect } from 'react';
import Singleton from '../../../../core/patterns/singleton';
import { getServerImagesUrl } from '../../../../shared/utilities/format-server-endpoints.utility';

interface ColorPaletteProps {
  onColorSelected?: (index: number) => void;
}

export const ColorIndexSelection: React.FC<ColorPaletteProps> = ({ onColorSelected }) => {

  useEffect(() => {
    
    ChangeColorIndexButtonStatus(Singleton.getInstance().colorIndex);
   console.log("Changing color list");
  }, [Singleton.getInstance().currentColorList]);


  useEffect(() => {
    const instance = Singleton.getInstance();
    instance.updateColorFunc=updateColorStatus;

  }, []);

  function updateColorStatus()
  {
 
    setTimeout(() => {
      ChangeColorIndexButtonStatus(Singleton.getInstance().colorIndex);

    }, 1500);
  
  }

  function ChangeColorIndexButtonStatus(currIndex: number) {
    // First, reset any previous styling for elements from 0 to 4
    for (let i = 0; i <= 4; i++) {
        const elem = document.getElementById("color-option" + i);
        if (elem) {
            elem.style.border = "";  // Reset to default or whatever you prefer
        }
    }

    const mosaicComponent=document.getElementById("mosaic-element");

    if (mosaicComponent) {
     // Get all children components with class name 'img-container'
// Get all children components with class name 'img-container'
const imgContainers = mosaicComponent.querySelectorAll(".img-container");


imgContainers.forEach(container => {

  for(let currIndex = 0; currIndex <= 4; currIndex++) {
    // Find the path with the current ID within each container
    const pathElement = container.querySelector("#layer" + currIndex);
    
    if(pathElement) {
        // Set a border (stroke) to the path
        pathElement.removeAttribute("stroke");
        pathElement.removeAttribute("stroke-width");
    }
}
    // Find the path with the specified id within each container
    const pathElement = container.querySelector("#layer"+currIndex); // Replace 'pathId' with the actual ID you're looking for

    if(pathElement) {
        // Set a border (stroke) to the path
        pathElement.setAttribute("stroke", "#0069b4");
        pathElement.setAttribute("stroke-width", "10px");
    }
});


  }

    // Then, apply the desired style to the element with the specified currIndex, if it exists
    const targetElement = document.getElementById("color-option" + currIndex);
    if (targetElement) {
        targetElement.style.border = "3px solid var(--color-middle)";
    }
}


  const handleColorClick = (index: number) => {
    if (onColorSelected) {
      onColorSelected(index);
      ChangeColorIndexButtonStatus(index);
    }
  };

  const currentColorList = Singleton.getInstance().currentColorList;

  return (
    <div className='color-palette-row' id="ColorIndexSelection">
      {currentColorList && 
       Array.from({ length: currentColorList.length }).map((_, index) => (
        <div 
          key={index}
          onClick={() => handleColorClick(index)}
          id={`color-option${index}`}
          className='color-palette-item'
          style={{ backgroundImage: `url(${getServerImagesUrl(currentColorList[index].source)})` }}
        ></div>
      ))}
    </div>
  );
};
