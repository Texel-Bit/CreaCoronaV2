import { useEffect, useState } from "react";
import Singleton from "../../../../core/patterns/singleton";


interface ExperienceMosaicBricksProps
{
    brick:HTMLElement;
    grout: string
}


export const MosaicBrick:React.FC<ExperienceMosaicBricksProps> = (props) => {


    const [groutImageCss, setGroutImageCss] = useState("");
    const [bondPattern, setBondPattern] = useState(true);
    const [rowsAmount, setRowsAmount] = useState(0);


    useEffect(() => {
        if (props.grout)
            setGroutImageCss(props.grout ? `background-image: url(${props.grout})` : "");

        let selectedFormat = Singleton.getInstance().currentFormat;
        let hasBoundPattern = selectedFormat == undefined || selectedFormat.id == 1;

        setRowsAmount(hasBoundPattern ? 6 : 4);
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
                        ${groutImageCss}
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