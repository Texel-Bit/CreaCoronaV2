import LoginData from "../models/user/login-data.model";
import { getPostRequest } from "./base.service"

export const login = (loginData: LoginData) => {
    return getPostRequest("sysUser/login", loginData);
}