import { IDesignType } from "../designType/design-type.model"

export interface IEnvironmentType {
    id:number;
    source:string;
    name:string;
    designTypesIDS:number[];
    designTypes:IDesignType[]|null;
}