import { IEnvironmentType } from "../EnvironmentType/environment-type.model"


export interface IEnvironment {
    id:string
    source:string
    maskImage:string
    name:string
    environmentType:IEnvironmentType
    environmentAngle:any
}
