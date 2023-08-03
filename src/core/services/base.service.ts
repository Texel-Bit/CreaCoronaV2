import axios from "axios";
import { getServerEndpointUrl } from "../../shared/utilities/format-server-endpoints.utility";
import ServiceResponse from "../models/service/service-response.model";


export const getAbortServiceController = () => {
    const controller = new AbortController();
    return controller;
}

export const postRequest = <T>(route: string, requestData:T) : ServiceResponse => {
    const controller = new AbortController();
    const url = getServerEndpointUrl(route);
    return { call: axios.post(url, requestData, { signal: controller.signal }), controller };
}


export const getRequest = <T>(route: string) : ServiceResponse => {
    const controller = new AbortController();
    const url = getServerEndpointUrl(route);
    return { call: axios.get<T>(url, { signal: controller.signal }), controller };
}