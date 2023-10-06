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
                
                    width: 100%;
                }
                
                
                /*
                193.5   x  168    97 
                387  x 336 
                1.15
                //336  x  291 */
                
                /* Adjusting the position of SVGs in the first column. */
                .hexagon-column-1 .hexagon svg {
                    
                    position: relative;
                   transform: translate(-50%); 
                }
                
                .hexagon-column-2 {
                    position: relative;
                    transform: translate(-75%,-25%);
                }
                
                .hexagon-column-2-wrapper {
                    position: relative;
                   
                }
                
                .hexagon-column-3 {
                    position: relative;
                    transform: translate(-100%,0%);
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