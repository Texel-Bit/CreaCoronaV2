import React from "react";
import { IDesign } from "../../../../core/models/design/design.model";
import { getServerImagesUrl } from "../../../utilities/format-server-endpoints.utility";


interface ExperienceMosaicSquareProps
{
    squares:IDesign[];
}


export const MosaicSquare:React.FC<ExperienceMosaicSquareProps> = (props) => {
   
    console.log("Mosaic squares data ",props.squares);

    return(
        <div className='mosaic-square w-100'>

            <style>
                {
                    `.mosaic-square {
                        display: grid;
                        gap: .4rem;
                        grid-template-rows: repeat(2, 1fr);
                        grid-template-columns: repeat(2, 1fr);
                        padding: .2rem;
                    }`
                }
            </style>

            {
                props.squares.map(square => {
                    return <img src={getServerImagesUrl(square.source)}/>
                })
            }

        </div>
    );
}