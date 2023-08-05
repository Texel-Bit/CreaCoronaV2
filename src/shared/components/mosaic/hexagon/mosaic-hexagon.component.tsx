import { useEffect, useState } from "react";
import { IDesign } from "../../../../core/models/design/design.model";
import { getServerImagesUrl } from "../../../utilities/format-server-endpoints.utility";

interface ExperienceMosaicHexagonProps
{
    hexagon:HTMLElement;
    grout: string;
}


export const MosaicHexagon:React.FC<ExperienceMosaicHexagonProps> = (props) => {


    const [groutImageCss, setGroutImageCss] = useState("");


    useEffect(() => {
        if (props.grout)
            setGroutImageCss(props.grout ? `background-image: url(${props.grout})` : "");
    }, [props]);


    return(
        <div id="mosaic-element" className='mosaic-hexagon'>

            <style>
                {`
                    .mosaic-hexagon {
                        width: 100%;
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        height: 100%;
                        ${groutImageCss}
                    }

                    .hexagon-column {
                        width: 100%;
                    }

                    .hexagon-column-1 .hexagon img {
                        position: relative;
                        left: -100%;
                    }

                    .hexagon-column-2 {
                        position: relative;
                        left: -50%;
                        margin-left: .12rem;
                        margin-top: -.12rem;
                        height: 83.33%;
                    }

                    .hexagon-column-2-wrapper {
                        position: absolute;
                        top: -29.5%;
                    }

                    .hexagon {
                        padding: 2px;
                        width: 100%;
                    }

                    .hexagon img {
                        width: 200%;
                    }
                `}
            </style>

            <div className="hexagon-column hexagon-column-1">
                <div className="hexagon">
                    <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div>
                </div>
                <div className="hexagon">
                    <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div>
                </div>
            </div>

            <div className="hexagon-column hexagon-column-2">
                <div className="hexagon-column-2-wrapper">
                    <div className="hexagon">
                        <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div>
                    </div>
                    <div className="hexagon">
                        <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div>
                    </div>
                    <div className="hexagon">
                        <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div>
                    </div>
                </div>
            </div>

            <div className="hexagon-column hexagon-column-3">
                <div className="hexagon">
                    <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div>
                </div>
                <div className="hexagon">
                    <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div>
                </div>
            </div>

        </div>
    );
}