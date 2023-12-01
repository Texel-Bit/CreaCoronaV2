import { getRequest, postRequest } from "./base.service";


export const getAllFormatSizeByEnvironmentType = (environmentTypeId:number) => 
    getRequest("designTypeFormatSize/getDesignTypeFormatSizeByEnvironmentTypeId/"+environmentTypeId);

