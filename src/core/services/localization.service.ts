import { getRequest } from "./base.service";

export const getAllState = () => 
    getRequest("state/getAllState");