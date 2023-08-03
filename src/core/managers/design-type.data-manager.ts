import { IDesignType } from "../models/designType/design-type.model";

class DesignTypeDataManager
{
    private designTypeList: IDesignType[] = [];

    public getDesignTypeById(id:number)
    {
        return this.designTypeList.find(type => type.id === id);
    }
    public getAllDesignTypes()
    {
        return this.designTypeList;
    }
    public addDesignType(_designType: IDesignType) {
      // Check if a design type with the same id already exists in the list
      const exists = this.designTypeList.some(designType => designType.id === _designType.id);
  
      // If not, add it to the list
      if (!exists) {
          this.designTypeList.push(_designType);
      } 
  }

   public getDesignTypesById(ids:number[])
    {
        return  this.designTypeList.filter(designType => ids.includes(designType.id));
    }

    public removeDesignType(_designType:IDesignType)
    {
       this.designTypeList = this.designTypeList.filter(type => type.id !== _designType.id);
    }

    public setDesignTypeArray(_designType:IDesignType[])
    {
       this.designTypeList = _designType;
    }
}

export default DesignTypeDataManager;