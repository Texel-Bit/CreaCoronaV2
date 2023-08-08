import { IDesignType } from "../designType/design-type.model"

export interface IDesign{
    id:number
    source:string
    name:string
    designType:IDesignType|null,
    fullField:boolean
}