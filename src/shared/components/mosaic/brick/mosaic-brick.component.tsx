import { useEffect, useState } from "react";
import Singleton from "../../../../core/patterns/singleton";


interface ExperienceMosaicBricksProps
{
    brick:HTMLElement;
    grout: string,
    rotated: boolean
}


export const MosaicBrick:React.FC<ExperienceMosaicBricksProps> = (props) => {

    const [bondPattern, setBondPattern] = useState(true);
    const [rowsAmount, setRowsAmount] = useState(0);
    const [bricksStyle, setBricksStyle] = useState("");

    useEffect(() => {
        
        let newBricksStyle = props.grout ? `background-image: url(${props.grout});` : "";

        if (props.rotated)
            newBricksStyle += "transform: rotate(90deg)";
        else
            newBricksStyle += "";
            console.log("BRICKS STYLE => ", newBricksStyle, props);
        setBricksStyle(newBricksStyle);

        let selectedFormat = Singleton.getInstance().currentFormat;
        let hasBoundPattern = selectedFormat == undefined || selectedFormat.id == 1;

        setRowsAmount(hasBoundPattern && !props.rotated ? 6 : 4);
        setBondPattern(hasBoundPattern);
    }, [props]);


    return(
        <div id="mosaic-element" className="mosaic-brick w-100">

            <style>
                {`
                    .mosaic-brick {
                        display: flex;
                        flex-direction: column;
                        gap: .4rem;
                        padding: .2rem;
                        overflow: hidden;
                        ${bricksStyle}
                    }
                
                    .brick-row {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: .4rem;
                    }

                    .brick-row-offset {
                        width: 150%;
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: .4rem;
                        margin-left: -25%;
                    }
                `}
            </style>

            {
                Array.from({ length: rowsAmount }).map((_, index) => {

                    let rowOffset = index % 2 != 0 && bondPattern;

                    return <div key={`mosaicBrickRow${index}`} className={rowOffset ? "brick-row-offset" : "brick-row"}>
                        <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                        <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                        {rowOffset && <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>}
                    </div>
                })
            }
        </div>
    );
}