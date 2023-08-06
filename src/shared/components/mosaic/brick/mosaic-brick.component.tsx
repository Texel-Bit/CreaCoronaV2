import { useEffect, useState } from "react";


interface ExperienceMosaicBricksProps
{
    brick:HTMLElement;
    grout: string
}


export const MosaicBrick:React.FC<ExperienceMosaicBricksProps> = (props) => {


    const [groutImageCss, setGroutImageCss] = useState("");
    // const []


    useEffect(() => {
        if (props.grout)
            setGroutImageCss(props.grout ? `background-image: url(${props.grout})` : "");

        
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

            <div key={"mosaicBrickRow1"} className="brick-row">
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
            </div>
            <div key={"mosaicBrickRow2"} className="brick-row-offset">
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
            </div>
            <div key={"mosaicBrickRow3"} className="brick-row">
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
            </div>
            <div key={"mosaicBrickRow4"} className="brick-row-offset">
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
            </div>
            <div key={"mosaicBrickRow5"} className="brick-row">
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
            </div>
            <div key={"mosaicBrickRow6"} className="brick-row-offset">
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
                <div dangerouslySetInnerHTML={{ __html: props.brick.outerHTML }}></div>
            </div>
        </div>
    );
}