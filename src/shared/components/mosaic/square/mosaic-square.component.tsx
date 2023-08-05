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
                    <img   src={getServerImagesUrl(square.source)} alt={square.name} />
                    
                </div>
                })
            }

        </div>
    );
}