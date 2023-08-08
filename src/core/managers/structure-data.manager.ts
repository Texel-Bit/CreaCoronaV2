import { IStructure } from "../models/structure/structure.model";

class StructureDataManager
{
    private structureList: IStructure[] = [];

    public getStructureById(id:number)
    {
        return this.structureList.find(structure => structure.id === id);
    }

    public getAllStructuresByColorType(colorType: number): IStructure[] {
      return this.structureList.filter(structure => structure.designColorType.includes(colorType));
  }
  
  

    public addStructure(_structure:IStructure)
    {
       this.structureList.push(_structure);
    }

    public cleanStructures()
    {
       this.structureList=[]
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