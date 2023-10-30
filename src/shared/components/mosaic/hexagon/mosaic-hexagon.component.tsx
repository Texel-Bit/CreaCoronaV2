import { useEffect, useState } from "react";
import "./mosaic-hexagon.css"

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
                    width: 291px;
                    height:336px;
                    display: flex;
                    ${groutImageCss}
                }
                
                .hexagon-column {
                    display:flex;
                    flex-direction:column;
                    width: 100%;
                }
                
                
              
                .hexagon-column-1 .hexagon svg {
                    display:flex
                    position: relative;
                   transform: translate(-52%); 
                   scale:0.97
                }
                
                .hexagon-column-2 {
                    position: relative;
                    transform: translate(-73%,-26%);
                    gap:0.20rem;
                }
                
                .hexagon-column-2-wrapper {
                    position: relative;
                    display:flex;
                    gap:0.26rem;
                    flex-direction:column;
                }
                
                .hexagon-column-3 .hexagon svg {
                    position: relative;
                    transform: translate(-98%);
                    scale:0.97
                }
                .hexagon {
                   width: 193.5px;
                   height:168px ;
                }
                
                .hexagon svg {
                    
                }
                
                `}
            </style>

            <div className="hexagon-column hexagon-column-1">
                <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}>
                    {/* <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div> */}
                </div>
                <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}>
                    {/* <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div> */}
                </div>
            </div>

            <div className="hexagon-column hexagon-column-2">
                <div className="hexagon-column-2-wrapper">
                    <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}>
                        {/* <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div> */}
                    </div>
                    <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}>
                        {/* <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div> */}
                    </div>
                    <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}>
                        {/* <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div> */}
                    </div>
                </div>
            </div>

            <div className="hexagon-column hexagon-column-3">
                <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}>
                    {/* <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div> */}
                </div>
                <div className="hexagon" dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}>
                    {/* <div dangerouslySetInnerHTML={{ __html: props.hexagon.outerHTML }}></div> */}
                </div>
            </div>

        </div>
    );
}