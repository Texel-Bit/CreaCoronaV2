import React, { useEffect, useState } from "react";
import { IDesign } from "../../../../core/models/design/design.model";
import { getServerImagesUrl } from "../../../utilities/format-server-endpoints.utility";
import './mosaic-square.component.css'


interface ExperienceMosaicSquareProps
{
    squares:HTMLElement[];
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
                props.squares.map((square) => 
                    <div className="img-container" dangerouslySetInnerHTML={{ __html: square.outerHTML }}></div>)
            }

        </div>
    );
}