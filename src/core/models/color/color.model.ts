
import { IDesignType } from "../designType/design-type.model"

export interface IColor{
    id:string
    source:string
    name:string
    design:IDesignType
    isFullField:boolean
}