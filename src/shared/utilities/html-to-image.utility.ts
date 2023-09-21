import { toPng } from "html-to-image";
 
let imageCache: { [key: string]: string } = {};

export const convertHtmlToImage = async (htmlElement: HTMLElement) => {
    if (!htmlElement) return "";
    
    const cacheKey = htmlElement.innerHTML; // Simple example, you might want a better key
    if (imageCache[cacheKey]) {
        return imageCache[cacheKey];
    }
    
    let imgUrl = await toPng(htmlElement);
    imageCache[cacheKey] = imgUrl;
    
    return imgUrl;
}
