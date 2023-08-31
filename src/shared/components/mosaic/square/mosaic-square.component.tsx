import React, { useEffect, useState } from "react";
import SvgTexturizer from "../../../utilities/svg-texturizer.utility";


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
    }, [props.grout,props.squares]);

    return(
        <div id="mosaic-element" className='mosaic-square w-100'>

            <style>
                {
                    `.mosaic-square {
                        display: grid;
                        gap: .28rem;
                        grid-template-rows: repeat(2, 1fr);
                        grid-template-columns: repeat(2, 1fr);
                        padding: .14rem;
                        ${groutImageCss}
                    }`
                }
            </style>
            {
                props.squares.map((square, index) => 
                    <div key={`mosaic-square-key${index}`} className="img-container" dangerouslySetInnerHTML={{ __html: square.outerHTML }}></div>)
            }




        </div>
    );
}