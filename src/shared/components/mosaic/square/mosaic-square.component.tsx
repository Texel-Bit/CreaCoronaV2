import React from "react";
import { IDesign } from "../../../../core/models/design/design.model";


interface ExperienceMosaicSquareProps
{
    squares:IDesign[];
}


export const MosaicSquare:React.FC<ExperienceMosaicSquareProps> = (props) => {
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
                    return <img src={square.source}/>
                })
            }

        </div>
    );
}