import { IDesignType } from "../designType/design-type.model"

export interface IFormat{
    id:string
    source:string
    name:string
    designType:IDesignType
}