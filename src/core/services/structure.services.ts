import { getDevelopmentRequest, getRequest, postDevelopmentRequest } from "./base.service";

export const getDesgignWithStructure = (design: string) => 
    postDevelopmentRequest("formatSizeTexture/castHtmlToPng",design);