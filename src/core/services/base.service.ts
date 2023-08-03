import axios from "axios";
import { getServerEndpointUrl } from "../../shared/utilities/format-server-endpoints.utility";
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