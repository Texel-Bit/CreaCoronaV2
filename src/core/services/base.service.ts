import { getServerDevelopmentUrl, getServerEndpointUrl } from "../../shared/utilities/format-server-endpoints.utility";
import ServiceResponse from "../models/service/service-response.model";


export const postRequest = async <T>(route: string, requestData?:T) : Promise<any> => {
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

    export const postDevelopmentRequest = async <T>(route: string, requestData?:T) : Promise<any> => {
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

export const putRequest = async <T>(route: string, requestData?: T): Promise<any> => {
    const url = getServerDevelopmentUrl(route);
    const token = `${sessionStorage.getItem('infoUser')}` ?? "";

    const queryOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Jwt': token
        },
        body: JSON.stringify(requestData)
    };

    try {
        const response = await fetch(url, queryOptions);

        if (response.ok) {
            return await response.json();
        } else {
            // Handle non-OK responses if needed
            throw new Error(`Server responded with status: ${response.status}`);
        }
    } catch (error) {
        console.log("PUT DEVELOPMENT REQUEST ERROR => ", error);
        throw error; // Rethrow the error if you want to handle it where the function is called
    }
};


