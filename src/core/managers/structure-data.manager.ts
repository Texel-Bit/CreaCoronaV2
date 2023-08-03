import { IStructure } from "../models/structure/structure.model";

class StructureDataManager
{
    private structureList: IStructure[] = [];

    public getStructureById(id:string)
    {
        return this.structureList.find(structure => structure.id === id);
    }

    public addStructure(_structure:IStructure)
    {
       this.structureList.push(_structure);
    }

    public removeStructure(_structure:IStructure)
    {
       this.structureList = this.structureList.filter(structure => structure.id !== _structure.id);
    }

    public setStructureArray(_structure:IStructure[])
    {
       this.structureList = _structure;
    }
}

export default StructureDataManager;