import { IDesignType } from "../models/designType/design-type.model";

class DesignTypeDataManager
{
    private designTypeList: IDesignType[] = [];

    public getDesignTypeById(id:string)
    {
        return this.designTypeList.find(type => type.id === id);
    }

    public addDesignType(_designType:IDesignType)
    {
       this.designTypeList.push(_designType);
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