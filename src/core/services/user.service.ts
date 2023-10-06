import LoginData from "../models/user/login-data.model";
import { postRequest } from "./base.service"

/* En una función flecha cuando tiene un parámetro tiene un return implícito */
export const login = (loginData: LoginData) => 
    postRequest("sysUser/login", loginData);

export const getCounselors = () => 
postRequest("sysUser/getCounselors",{});