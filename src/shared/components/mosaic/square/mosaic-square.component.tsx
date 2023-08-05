import React, { useEffect, useState } from "react";
import { IDesign } from "../../../../core/models/design/design.model";
import { getServerImagesUrl } from "../../../utilities/format-server-endpoints.utility";
import Singleton from "../../../../core/patterns/singleton";
import './mosaic-square.component.css'
import SwapVertIcon from '@material-ui/icons/SwapVert';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import RefreshIcon from '@material-ui/icons/Refresh';

interface ExperienceMosaicSquareProps
{
    squares:IDesign[];
    grout: string;
}



export const MosaicSquare:React.FC<ExperienceMosaicSquareProps> = (props) => {
   
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [overlayStyle, setOverlayStyle] = useState({});
    const [leftIcon, setLeftIcon] = useState(<SwapVertIcon/>);
    const [rightIcon, setRightIcon] = useState(<SwapHorizIcon />);
    const [centerIcon, setCenterIcon] = useState(<RefreshIcon />);
    

    const [rotations, setRotations] = useState([0, 90, 180, 270]);

    


    useEffect(() => {
        
        console.log("Rotations seted up ");

    },[rotations]);

    useEffect(() => {
        setRotations([0, 90, 180, 270]);
    },[]);
    
    

    const handleClick = (i:any) => {
        setSelectedIndex(i);
        Singleton.getInstance().ChangeMosaicIndex(i);
        setOverlayStyle(newStyle);
    };

    const handleSwapVerticalClick = () => {
        let targetIndex=0;


        switch (selectedIndex) {
          case 0:
            targetIndex = 2;
            break;
          case 2:
            targetIndex = 0;
            break;
          case 1:
            targetIndex = 3;
            break;
          case 3:
            targetIndex = 1;
            break;
          default:
            console.log("Invalid selectedIndex");
            return;
        }

        console.log(" From ",selectedIndex," To ",targetIndex)

        handleClick(targetIndex)
        Singleton.getInstance().SwapMosaicItems(selectedIndex, targetIndex);
      }

      const handleSwapHorizontalClick = () => {
        
        console.log("Horizontal button ",selectedIndex)
        let targetIndex=0;
    

        switch (selectedIndex) {
            case 0:
                targetIndex = 1;
                break;
            case 1:
                targetIndex = 0;
                break;
            case 2:
                targetIndex = 3;
                break;
            case 3:
                targetIndex = 2;
                break;
            default:
                console.log("Invalid selectedIndex");
                return;
        }
        handleClick(targetIndex)
        Singleton.getInstance().SwapMosaicItems(selectedIndex, targetIndex);
    }

    const RotateObject= (targetIndex:number) => {

        
        if(rotations[targetIndex])
        {
            rotations[targetIndex]+=90;
        }
        console.log("Attemping to rotate ",targetIndex," rotations ",rotations)
        setRotations(rotations.slice());
    }
    
    <button className="overlayButton" onClick={handleSwapHorizontalClick}>{leftIcon}</button>
    

    const ChangeDesignPosition = (from:any,to:any) => {
        setSelectedIndex(to);
        Singleton.getInstance().SwapMosaicItems(from,to);
        setOverlayStyle(newStyle);
    };


    const newStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderWidth: '3px', 
        borderStyle: 'solid',
        borderColor: '#0d6efd', 
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '10px',
    };

   
    const overlayButtonContainerStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    };


    const [groutImageCss, setGroutImageCss] = useState("");


    useEffect(() => {
        if (props.grout)
            setGroutImageCss(props.grout ? `background-image: url(${props.grout})` : "");
    }, [props]);



    return(
        <div id="mosaic-element" className='mosaic-square w-100'>

            <style>
                {
                    `.mosaic-square {
                        display: grid;
                        gap: .4rem;
                        grid-template-rows: repeat(2, 1fr);
                        grid-template-columns: repeat(2, 1fr);
                        padding: .2rem;
                        ${groutImageCss}
                    }`
                }
            </style>
            {
                props.squares.map((square,i) => {
                    return <div className="img-container" key={i}>
                    <img  style={{transform: `rotate(${rotations[i] || 0}deg)`}}  onClick={() => handleClick(i)} src={getServerImagesUrl(square.source)} alt={square.name} />
                    {selectedIndex === i && !square.fullField &&(
                           <div style={overlayStyle}>
             <div style={overlayButtonContainerStyle}>
                <button className="overlayButton" onClick={handleSwapVerticalClick} >{leftIcon}</button>
                <button className="overlayButton" onClick={()=>RotateObject(i)}>{centerIcon}</button>
                <button className="overlayButton" onClick={handleSwapHorizontalClick}>{rightIcon}</button>
            </div>
        </div>
                        )}
                </div>
                })
            }

        </div>
    );
}