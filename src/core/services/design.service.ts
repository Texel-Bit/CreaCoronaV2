import { getRequest, postRequest } from "./base.service";


export const getAllDesignType = () => 
    getRequest("desingType/getAllDesignType");


export const getAllDesignByTypeId = (desingTypeId: number) =>
    postRequest("desingType/getAllDesignTypeTest", { idDesignType: desingTypeId });


export const getDesignColorsByType = (designTypeId: number, environmentTypeId: number) => {
    let params = {
        designType_idDesignType: designTypeId,
        environmentTypeId
    };

    return postRequest("environmentType/getDesignColorTypesByEnvironmentIdAndDesignType", params);
}
    

export const getAllDesignColorsBundle = (designTypeId: number, designColorTypeId:number, environmentTypeId: number) => {
    let params = {
        idDesignType: designTypeId,
        idDesignColorType: designColorTypeId,
        idEnvironmentType: environmentTypeId,
    }
    
    return postRequest("designColorBundle/getAllDesignColorBundleByFilters", params);
}


export const getAllGrouts = () =>
    getRequest("brecha/getAllBrecha");