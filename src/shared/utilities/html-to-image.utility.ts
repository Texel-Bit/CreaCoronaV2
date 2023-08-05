import { toSvg, toPng } from "html-to-image"

export const convertHtmlToImage = async (htmlElement: HTMLElement) => {    
    if (!htmlElement)
        return;
    
    let imgUrl = await toPng(htmlElement);
    return imgUrl;
}