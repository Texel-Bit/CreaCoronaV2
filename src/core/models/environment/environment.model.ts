import { IEnvironmentType } from "../EnvironmentType/environment-type.model"


export interface IEnvironment {
    id:number
    source:string
    maskImage:string
    name:string
    environmentType:IEnvironmentType
    environmentAngle:any
    environmentIcon:string
}
