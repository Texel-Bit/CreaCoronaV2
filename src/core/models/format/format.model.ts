import { IDesignType } from "../designType/design-type.model"
import { IStructure } from "../structure/structure.model"

export interface IFormat{
    id:string
    source:string
    name:string
    width:number
    height:number
    formats:IStructure[],
}