import axios from "axios";
import { getServerEndpointUrl } from "../utilities/format-server-endpoints.utility";
import ServiceResponse from "../models/service/service-response.model";

export const getAbortServiceController = () => {
    const controller = new AbortController();
    return controller;
}

export const getPostRequest = <T>(route: string, requestData:T) : ServiceResponse => {
    const controller = new AbortController();
    const url = getServerEndpointUrl(route);
    return { call: axios.post(url, requestData, { signal: controller.signal }), controller };
}