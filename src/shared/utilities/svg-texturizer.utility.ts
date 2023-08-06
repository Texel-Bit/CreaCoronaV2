import axios from 'axios';


export interface TexturizeSvgOptions {
    layerId: string;
    textureUrl: string;
    tile: number;
}

interface LinealGradientConfig {
    id: string;
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    gradientTransform: string;
    gradientUnits: string;
    href: string
    stops: LinearGradientStopConfig[]
}

interface LinearGradientStopConfig {
    offset: number;
    stopColor: string;
    stopOpacity: number;
}


class SvgTexturizer {

    private LINK_NAMESPACE = 'http://www.w3.org/1999/xlink';
    private SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    private XML_NAMESPACE = 'http://www.w3.org/2000/xmlns/';


    public loadSvgByPath = async (path: string): Promise<HTMLElement> => {
        return await axios
            .get(path)
            .then(response => {
                const parser = new DOMParser();
                const svgDocument = parser.parseFromString(response.data, 'image/svg+xml');
                return svgDocument.documentElement;
            })
            .catch(error => {
                console.error('Error al cargar el archivo SVG:', error);
                throw error;
            });
    }


    public texturize = async (id: number, svgUrl: string, options: TexturizeSvgOptions[]) => {
        const svgElement = await this._buildSvgElement(svgUrl);
       
        options.forEach((option) => {
            
            if (option.layerId != "" ) {

                console.log("RECORRIENDO TEXTURIZADOR => ", option);
                let patternId = this._addSvgPattern(svgElement, option);
                let currentLayer = svgElement.querySelector(`#${option.layerId}`);

                if (currentLayer) {
                    currentLayer.setAttribute('class', '');
                    currentLayer.setAttribute('fill', `url(#${patternId})`);
                }
            }
        });
       
        svgElement.setAttribute("id", id.toString());
        return svgElement;
    }


    public addFilter = (svgElement: HTMLElement, filterUrl: string) => {
        let filterId = this._addSvgFilter(svgElement, filterUrl);

        const imageTagsList = svgElement.querySelectorAll('defs pattern image');
        const imagePathList = svgElement.querySelectorAll('path');
        const imageRectList = svgElement.querySelectorAll('rect');

        Array.from(imageTagsList).map((image, index) => {
            image.setAttribute('filter', `url(#${filterId})`);
        });

        Array.from(imagePathList).map((image, index) => {
            let fillAttribute = String(image.getAttribute('fill'));

            if (!fillAttribute.includes('url')&& image.id.includes("layer"))
                image.setAttribute('filter', `url(#${filterId})`);
        });

        Array.from(imageRectList).map((image, index) => {
            image.setAttribute('filter', `url(#${filterId})`);
        });
    }


    public rotateImage = (svgElement: HTMLElement, degrees: number) => {
        // let rotationContent = `
        //     <g transform="{rotate(${degrees} 100 100)}">
        //         <circle cx="100" cy="100" r="50" fill="blue" />
        //     </g>`;

        // svgElement.insertAdjacentHTML('beforeend', rotationContent);
        // svgElement.setAttribute('style', `transform: rotate(${degrees}deg)`);

        
        Array.from(svgElement.children). filter(pathElement => {
            if (pathElement.tagName.toLowerCase() === 'path')
            {
                let pathId = pathElement.getAttribute('id');

                if (pathId?.includes('layer'))
                {
                    let centerX = 50;
                    let centerY = 50;
                    // console.log("SVG ELEMENT WIDTH => ", centerX, centerY);
                    pathElement.setAttribute('transform', `rotate(${degrees} ${centerX} ${centerY})`);
                }
            }
        }) as SVGPathElement[];

        // console.log("ELEMENTOS A ROTAR", elementsToRotate.length);

        // if (elementToRotate) {
        //     const centerX = Number(elementToRotate.getAttribute('cx'));
        //     const centerY = Number(elementToRotate.getAttribute('cy'));
        //     elementToRotate.setAttribute('transform', `rotate(${degrees} ${centerX} ${centerY})`);
        // }
    }


    public addBisels = (svgElement: HTMLElement) => {       
        this._addBiselStyles(svgElement);
        this._addBiselGradients(svgElement);
        this._addBiselEdges(svgElement);
    }

    private _addBiselStyles = (svgElement: HTMLElement) => {

        let newStyle = `.cls-1{fill:#fff;stroke:#000;stroke-miterlimit:10;stroke-width:2px;}
                        .cls-2{fill:url(#Degradado_sin_nombre);}
                        .cls-3{fill:url(#Degradado_sin_nombre_2);}
                        .cls-4{fill:url(#Degradado_sin_nombre_3);}
                        .cls-5{fill:url(#Degradado_sin_nombre_4);}`;

        let stylesElement = this._getElementStyles(svgElement);
        stylesElement.innerHTML += newStyle;
    };

    private _addBiselEdges = (svgElement: HTMLElement) => {

        let contenidoAgregar = `<g id="edges">
            <path id="rect862-8" class="cls-2" d="M396.43,4.45,381.11,21.07h0l.32,360.65h0l15,14.42c.12.12.32-.15.32-.32V4.77c0-.18-.2-.45-.32-.32Z" transform="translate(-4.63 -3.41)"/>
            <path id="rect862-8-0" class="cls-3" d="M396.62,396.39l-15.19-14.67h0L20.78,382h0l-16,14.48C134.79,398.33,266.17,396.72,396.62,396.39Z" transform="translate(-4.63 -3.41)"/>
            <path id="rect862-8-8" class="cls-4" d="M20.05,22.86h0l361.06-1.79h0L396.43,4.45,5.37,4.37Z" transform="translate(-4.63 -3.41)"/>
            <path id="rect862-8-0-3" class="cls-5" d="M5.37,4.37,20.05,22.86h0L20.78,382,4.63,396.72Z" transform="translate(-4.63 -3.41)"/>
        </g>`;

        svgElement.insertAdjacentHTML('beforeend', contenidoAgregar);
    }

    private _addBiselGradients = (svgElement: HTMLElement) => {
        let defsElement = this._getElementDefs(svgElement);

        let linearGradientCongfigs: LinealGradientConfig[] = [
            {
                id: "Degradado_sin_nombre", x1:"-590.75", y1:"199.6", x2:"-575.11", y2:"199.6",
                gradientTransform:"translate(-194 399.89) rotate(180)", gradientUnits:"userSpaceOnUse", href: "",
                stops: [
                    { offset: 0, stopColor:"#4d4d4d", stopOpacity: 0.8 },
                    { offset: 1, stopColor:"#4d4d4d", stopOpacity: 0 }
                ]
            },
            {
                id:"Degradado_sin_nombre_2", x1:"-714.75", y1:"516.07", x2:"-699.11", y2:"516.07", 
                gradientTransform:"translate(-315.39 -317.39) rotate(-90)", gradientUnits: "", href:"#Degradado_sin_nombre",
                stops: []
            },
            {
                id:"Degradado_sin_nombre_3", x1:"200.9", y1:"395.59", x2:"200.9", y2:"377",
                gradientTransform:"matrix(1, 0, 0, -1, 0, 399.89)", gradientUnits:"userSpaceOnUse", href: "",
                stops: [
                    { offset: 0, stopColor:"#fff", stopOpacity: 0.8 },
                    { offset: 1, stopColor:"#fff", stopOpacity: 0 }
                ]
            },
            {
                id:"Degradado_sin_nombre_4", x1:"4.63", y1:"199.34", x2:"20.78", y2:"199.34", 
                gradientTransform:"", gradientUnits: "", href:"#Degradado_sin_nombre_3",
                stops: []
            }
        ]

        linearGradientCongfigs.map(gradientConfig => {
            let linearGradient = this._getLinearGradientDefs(gradientConfig);
            defsElement.appendChild(linearGradient);
        });
    }

    private _getLinearGradientDefs = (gradientConfig: LinealGradientConfig): HTMLElement => {

        const linearGradient = document.createElementNS(this.SVG_NAMESPACE, 'linearGradient') as HTMLElement;

        if (gradientConfig.href != "")
            linearGradient.setAttributeNS(this.LINK_NAMESPACE, 'xlink:href', gradientConfig.href);

        linearGradient.setAttribute('id', gradientConfig.id);
        linearGradient.setAttribute('x1', gradientConfig.x1);
        linearGradient.setAttribute('y1', gradientConfig.y1);
        linearGradient.setAttribute('x2', gradientConfig.x2);
        linearGradient.setAttribute('y2', gradientConfig.y2);
        linearGradient.setAttribute('gradientTransform', gradientConfig.gradientTransform);

        if (gradientConfig.gradientUnits != "")
            linearGradient.setAttribute('gradientUnits', gradientConfig.gradientUnits);

        if (gradientConfig.stops?.length > 0)
        {
            const linearGradientContent = gradientConfig.stops.map(stop => {
                return `<stop offset="${stop.offset}" stop-color="${stop.stopColor}" stop-opacity="${stop.stopOpacity}"/>`
            });

            linearGradient.innerHTML = linearGradientContent.join();
        }

        return linearGradient;
    }


    private _buildSvgElement = async (svgUrl: string): Promise<HTMLElement> => {
        const svgElement = await this.loadSvgByPath(svgUrl);

        var xlinkNamespace = svgElement.getAttributeNS(this.XML_NAMESPACE, 'xmlns:xlink');
        xlinkNamespace || svgElement.setAttributeNS(this.XML_NAMESPACE, 'xmlns:xlink', this.LINK_NAMESPACE);

        let defsElement = this._getElementDefs(svgElement);
        svgElement.prepend(defsElement);

        return svgElement;
    }


    private _getElementDefs = (svgElement: HTMLElement): SVGDefsElement => {
        let defsElement = svgElement.querySelector('defs');

        if (defsElement)
            return defsElement;

        defsElement = document.createElementNS(this.SVG_NAMESPACE, 'defs') as SVGDefsElement;
        return defsElement;
    }


    private _getElementStyles = (svgElement: HTMLElement): SVGStyleElement => {
        let defsElement = this._getElementDefs(svgElement);
        let styleElement = svgElement.querySelector('style') as unknown as SVGStyleElement;
        
        if (styleElement)
            return styleElement;

        styleElement = document.createElementNS(this.SVG_NAMESPACE, 'style') as SVGStyleElement;
        defsElement.appendChild(styleElement);
        return styleElement;
    }


    private _addSvgFilter = (svgElement: HTMLElement, filterUrl: string): string => {
        let filterId = 'multiply-filter';
        let filter = document.createElementNS(this.SVG_NAMESPACE, 'filter');
        filter.setAttribute('id', filterId);
        filter.setAttribute('x', '0');
        filter.setAttribute('y', '0');
        filter.setAttribute('width', '200%');
        filter.setAttribute('height', '200%');

        let feImage = document.createElementNS(this.SVG_NAMESPACE, 'feImage');
        feImage.setAttributeNS(this.LINK_NAMESPACE, 'href', filterUrl);
        feImage.setAttribute('result', 'texture');
        feImage.setAttribute('x', '0');
        feImage.setAttribute('y', '0');
        feImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        feImage.setAttribute('min-width', '100%');
        feImage.setAttribute('min-height', '100%');

        let feBlend = document.createElementNS(this.SVG_NAMESPACE, 'feBlend');
        feBlend.setAttribute('mode', 'multiply');
        feBlend.setAttribute('in', 'SourceGraphic');
        feBlend.setAttribute('in2', 'texture');

        filter.appendChild(feImage);
        filter.appendChild(feBlend);

        let defsElement = this._getElementDefs(svgElement);
        defsElement.appendChild(filter);

        return filterId;
    }


    private _addSvgPattern = (svgElement: HTMLElement, patternSettings: TexturizeSvgOptions): string => {
        const patternElement = document.createElementNS(this.SVG_NAMESPACE, 'pattern');
        const tileSize = 100 / patternSettings.tile;
        let svgImageElement = this._getTextureImageElement(patternSettings);

        const patternId = `p_${patternSettings.layerId}`;
        patternElement.setAttribute('id', patternId);
        patternElement.setAttribute('patternUnits', 'userSpaceOnUse');
        patternElement.setAttribute('width', `${tileSize}%`);
        patternElement.setAttribute('height', `${tileSize}%`);

        patternElement.appendChild(svgImageElement);

        let defsElement = this._getElementDefs(svgElement);
        defsElement.appendChild(patternElement);

        return patternId;
    }


    private _getTextureImageElement = (patternSettings: TexturizeSvgOptions): SVGImageElement => {
        const imageElement = document.createElementNS(this.SVG_NAMESPACE, 'image') as SVGImageElement;

        imageElement.setAttribute('xlink:href', patternSettings.textureUrl);
        imageElement.setAttribute('width', '100%');
        // imageElement.setAttribute('height', '100%');

        imageElement.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        imageElement.setAttribute('image-rendering', 'crispEdges');

        return imageElement;
    }
}

export default SvgTexturizer;