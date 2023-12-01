import { getRequest } from "./base.service";

export const getAllEnvironmentType = () => 
    getRequest("environmentType/getAllEnvironmentType");

    
export const getDesignTypeFormatSizByEnvironmentTypeId = (environmentTypeId:number) =>
getRequest("designTypeFormatSize/getDesignTypeFormatSizeByEnvironmentTypeId/"+environmentTypeId);