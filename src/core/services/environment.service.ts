import { getRequest } from "./base.service";

export const getAllEnvironmentType = () => 
    getRequest("environmentType/getAllEnvironmentType");