import LoginData from "../models/user/login-data.model";
import { postRequest } from "./base.service"

export const login = (loginData: LoginData) => {
    return postRequest("sysUser/login", loginData);
}