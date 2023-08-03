import axios from 'axios';


interface TexturizeSvgOptions {
    layerId: string;
    textureUrl: string;
    tile: number;
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


    public texturize = async (svgUrl: string, options: TexturizeSvgOptions[]) => {
        const svgElement = await this.loadSvgByPath(svgUrl);
        const clonedSvg = this._buildClonedSvgElement(svgElement);
        options.map(option => {
            if (option.layerId != "" ) {
                let patternId = this._addSvgPattern(clonedSvg, option);
                let currentLayer = clonedSvg.querySelector(`#${option.layerId}`);

                if (currentLayer) {
                    currentLayer.setAttribute('class', '');
                    // currentLayer.classList = new DOMTokenList();
                    currentLayer.setAttribute('fill', `url(#${patternId})`);
                }
            }

        });
        return clonedSvg;
    }


    public addFilter = (svgElement: HTMLElement, filterUrl: string): HTMLElement => {
        const clonedSvg = svgElement.cloneNode(true) as HTMLElement;
        let filterId = this._addSvgFilter(clonedSvg, filterUrl);
        const imageTagsList = clonedSvg.querySelectorAll('defs pattern image');
        const imagePathList = clonedSvg.querySelectorAll('path');
        const imageRectList = clonedSvg.querySelectorAll('rect');

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

        return clonedSvg;
    }


    private _buildClonedSvgElement = (svgElement: HTMLElement): HTMLElement => {
        const clonedSvgElement = svgElement.cloneNode(true) as HTMLElement;

        var xlinkNamespace = clonedSvgElement.getAttributeNS(this.XML_NAMESPACE, 'xmlns:xlink');
        let defsElement = clonedSvgElement.querySelector('defs');

        xlinkNamespace || clonedSvgElement.setAttributeNS(this.XML_NAMESPACE, 'xmlns:xlink', this.LINK_NAMESPACE);

        if (!defsElement) {
            let defsElement = document.createElementNS(this.SVG_NAMESPACE, 'defs');
            clonedSvgElement.prepend(defsElement);
        }

        return clonedSvgElement;
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

        if(svgElement.querySelector('defs')!=undefined || svgElement.querySelector('defs')!=null)
            svgElement.querySelector('defs')?.appendChild(filter);

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
        svgElement.querySelector('defs')!.appendChild(patternElement);

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