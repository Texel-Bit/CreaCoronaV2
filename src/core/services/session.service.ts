import { getRequest, postRequest, putRequest } from "./base.service";

export const openSession = () => 
    postRequest("session/open");

export const closeSession = (id:any) => 
    putRequest("session/close/"+id);