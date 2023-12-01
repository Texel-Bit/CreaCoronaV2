import { getRequest, postRequest } from "./base.service";


export const getAllDesignType = () => 
    getRequest("designType/getAllDesignType");


export const getAllDesignByTypeId = (desingTypeId: number,idEnvironmentTypeId:number) =>
    postRequest("design/getDesignsByEnvironmentType", { DesignType_idDesignType: desingTypeId,EnvironmentType_idEnvironmentType:idEnvironmentTypeId });


export const getDesignColorsByType = (designTypeId: number, environmentTypeId: number) => {
    let params = {
        designType_idDesignType: designTypeId,
        environmentTypeId
    };

    return postRequest("environmentType/getDesignColorTypesByEnvironmentIdAndDesignType", params);
}
    

export const getAllDesignColorsBundle = (designTypeId: number, designColorTypeId:number, environmentTypeId: number) => {
    
    
    let params = {
        DesignType_idDesignType: designTypeId,
        DesignColorType_idDesignColorType: designColorTypeId,
        EnvironmentType_idEnvironmentType: environmentTypeId,
    }
    

    return postRequest("designColorBundle/getAllDesignColorBundleByFilters", params);
}


export const getAllGrouts = () =>
    getRequest("grout/getAllGroutes");


export const getAllDesignColorsByDesignTypeId = (designTypeId: number) =>
    getRequest("designColors/getAllDesignColorsByDesignTypeId/"+designTypeId);


    