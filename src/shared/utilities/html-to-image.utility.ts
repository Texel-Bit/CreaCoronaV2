import { toPng } from "html-to-image";
 
let imageCache: { [key: string]: string } = {};

export const convertHtmlToImage = async (htmlElement: HTMLElement) => {
    if (!htmlElement) return "";
    
    // Temporarily hide the element with the ID 'previewButton'
    const previewButton = htmlElement.querySelector("#previewButton")as HTMLElement;
    if (previewButton) {
        previewButton.style.display = "none";
    }
    
    const cacheKey = htmlElement.innerHTML; // Simple example, you might want a better key
    if (imageCache[cacheKey]) {
        // Restore the display of the 'previewButton' before returning
        if (previewButton) {
            previewButton.style.display = "";
        }
        return imageCache[cacheKey];
    }
    
    let imgUrl = await toPng(htmlElement);
    imageCache[cacheKey] = imgUrl;

    // Restore the display of the 'previewButton' after converting to PNG
    if (previewButton) {
        previewButton.style.display = "";
    }
    
    return imgUrl;
}
