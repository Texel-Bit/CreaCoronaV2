
import { IDesignType } from "../designType/design-type.model"

export interface IColor{
    id:number
    source:string
    name:string
    design:IDesignType|null
    isFullField:boolean
}