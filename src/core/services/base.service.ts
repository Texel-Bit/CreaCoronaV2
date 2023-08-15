import { getServerDevelopmentUrl, getServerEndpointUrl } from "../../shared/utilities/format-server-endpoints.utility";
import ServiceResponse from "../models/service/service-response.model";


export const postRequest = async <T>(route: string, requestData:T) : Promise<any> => {
    const url = getServerEndpointUrl(route);
    const token = `${sessionStorage.getItem('infoUser')}` ?? "";

    const queryOptions = {
        method:'POST',
        headers:{'Content-type':'application/json','Jwt': token },
        body: JSON.stringify(requestData)
    };

    const response = await fetch(url, queryOptions);
    return await response.json();
}

export const postDevelopmentRequest = async <T>(route: string, requestData:T) : Promise<any> => {
    const url = getServerDevelopmentUrl(route);
    const token = `${sessionStorage.getItem('infoUser')}` ?? "";
    
    const queryOptions = {
        method:'POST',
        headers:{'Content-type':'application/json','Jwt': token },
        body: JSON.stringify(requestData)
    };

    try {
        const response = await fetch(url, queryOptions);

        if (response.ok)
            return await response.json();
    }
    catch(error) {
        console.log("POST DEVELOPMENT REQUEST ERROR => ", error);
    }
}

export const getRequest = async (route: string) : Promise<any> => {
    const url = getServerEndpointUrl(route);
    const token = `${sessionStorage.getItem('infoUser')}` ?? "";

    const queryOptions = {
        method:'GET',
        headers:{'Content-type':'application/json', 'Jwt': token }
    };

    const response = await fetch(url, queryOptions);
    return await response.json();
}

export const getDevelopmentRequest = async <T>(route: string, requestData:T) : Promise<any> => {
    const url = getServerDevelopmentUrl(route);
    
    const token = `${sessionStorage.getItem('infoUser')}` ?? "";

    const queryOptions = {
        method:'POST',
        headers:{'Content-type':'application/json','Jwt': token },
        body: JSON.stringify(requestData)
    };

    const response = await fetch(url, queryOptions);
    return await response.json();
}
