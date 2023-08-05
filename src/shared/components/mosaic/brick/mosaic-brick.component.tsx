import { useEffect, useState } from "react";
import { IDesign } from "../../../../core/models/design/design.model";
import { getServerImagesUrl } from "../../../utilities/format-server-endpoints.utility";

interface ExperienceMosaicBricksProps
{
    brick:IDesign;
    grout: string
}


export const MosaicBrick:React.FC<ExperienceMosaicBricksProps> = (props) => {


    const [groutImageCss, setGroutImageCss] = useState("");


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

            <div className="brick-row">
                <img src={getServerImagesUrl(props.brick.source)} />
                <img src={getServerImagesUrl(props.brick.source)} />
            </div>
            <div className="brick-row-offset">
                <img src={getServerImagesUrl(props.brick.source)} />
                <img src={getServerImagesUrl(props.brick.source)} />
                <img src={getServerImagesUrl(props.brick.source)} />
            </div>
            <div className="brick-row">
                <img src={getServerImagesUrl(props.brick.source)} />
                <img src={getServerImagesUrl(props.brick.source)} />
            </div>
            <div className="brick-row-offset">
                <img src={getServerImagesUrl(props.brick.source)} />
                <img src={getServerImagesUrl(props.brick.source)} />
                <img src={getServerImagesUrl(props.brick.source)} />
            </div>
            <div className="brick-row">
                <img src={getServerImagesUrl(props.brick.source)} />
                <img src={getServerImagesUrl(props.brick.source)} />
            </div>
            <div className="brick-row-offset">
                <img src={getServerImagesUrl(props.brick.source)} />
                <img src={getServerImagesUrl(props.brick.source)} />
                <img src={getServerImagesUrl(props.brick.source)} />
            </div>
        </div>
    );
}