import { IDesignType } from "../designType/design-type.model"
import { IStructure } from "../structure/structure.model"

export interface IFormat{
    id:number
    source:string
    name:string
    width:number
    height:number
    scale:number|1,
    DesignType_idDesignType:number,
    formats:IStructure[],
}