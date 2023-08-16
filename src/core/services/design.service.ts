import { getRequest, postRequest } from "./base.service";


export const getAllDesignType = () => 
    getRequest("desingType/getAllDesignType");


export const getAllDesignByTypeId = (desingTypeId: number,idEnvironmentTypeId:number) =>
    postRequest("desingType/getAllDesignTypeTest", { idDesignType: desingTypeId,idEnvironmentType:idEnvironmentTypeId });


export const getDesignColorsByType = (designTypeId: number, environmentTypeId: number) => {
    let params = {
        designType_idDesignType: designTypeId,
        environmentTypeId
    };

    return postRequest("environmentType/getDesignColorTypesByEnvironmentIdAndDesignType", params);
}
    

export const getAllDesignColorsBundle = (designTypeId: number, designColorTypeId:number, environmentTypeId: number) => {
    
    console.log("Getting bundle  ");
    let params = {
        idDesignType: designTypeId,
        idDesignColorType: designColorTypeId,
        idEnvironmentType: environmentTypeId,
    }
    
    console.log(params,"Paraaaaaaaaaaams  ");
    return postRequest("designColorBundle/getAllDesignColorBundleByFilters", params);
}


export const getAllGrouts = () =>
    getRequest("brecha/getAllBrecha");