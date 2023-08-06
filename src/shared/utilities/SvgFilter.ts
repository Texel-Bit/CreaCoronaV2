import axios from 'axios';

export class SvgFilter {
    private readonly SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    private readonly XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';

    public loadSvg(svgElement: HTMLElement): SVGElement {
        if (svgElement instanceof SVGElement) {
            return svgElement;
        } else {
            throw new Error("The provided element is not an SVG element.");
        }
    }

    public async addTexture(svgElement: SVGElement, textureUrl: string): Promise<SVGElement> {
        const patternId = this.addPattern(svgElement, textureUrl);
        svgElement.style.fill = `url(#${patternId})`;

        return svgElement;
    }

    private addPattern(svgElement: SVGElement, textureUrl: string): string {
        const defsElement = svgElement.querySelector('defs') || this.addDefs(svgElement);
        const patternId = 'texture-pattern';

        const patternElement = document.createElementNS(this.SVG_NAMESPACE, 'pattern');
        patternElement.setAttribute('id', patternId);
        patternElement.setAttribute('patternUnits', 'userSpaceOnUse');
        patternElement.setAttribute('width', '100%');
        patternElement.setAttribute('height', '100%');

        const imageElement = document.createElementNS(this.SVG_NAMESPACE, 'image');
        imageElement.setAttributeNS(this.XLINK_NAMESPACE, 'href', textureUrl);
        imageElement.setAttribute('x', '0');
        imageElement.setAttribute('y', '0');
        imageElement.setAttribute('width', '100%');
        imageElement.setAttribute('height', '100%');

        patternElement.appendChild(imageElement);
        defsElement.appendChild(patternElement);

        return patternId;
    }

    private addDefs(svgElement: SVGElement): SVGDefsElement {
        const defsElement = document.createElementNS(this.SVG_NAMESPACE, 'defs');
        svgElement.insertBefore(defsElement, svgElement.firstChild);
        return defsElement;
    }
}
