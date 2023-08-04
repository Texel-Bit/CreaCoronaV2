import { IDesignType } from "../designType/design-type.model"

export interface IDesign{
    id:string
    source:string
    name:string
    designType:IDesignType,
    fullField:boolean
}