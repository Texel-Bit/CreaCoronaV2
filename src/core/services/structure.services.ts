import { getDevelopmentRequest, getRequest, postDevelopmentRequest } from "./base.service";

export const getDesgignWithStructure = (design: any) => 
    postDevelopmentRequest<any>("formatSizeTexture/castHtmlToPng", design);