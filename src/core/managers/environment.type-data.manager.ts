import { IEnvironmentType } from "../models/EnvironmentType/environment-type.model";

class EnvironmentTypeDataManager
{
    private environmentTypeList: IEnvironmentType[] = [];

    public getEnvironmentTypeById(id:number)
    {
        return this.environmentTypeList.find(envType => envType.id === id);
    }

    public addEnvironmentType(_environmentType:IEnvironmentType)
    {
      const index = this.environmentTypeList.findIndex(env => env.id === _environmentType.id);
  
      if (index !== -1) {
          // Environment with the same id exists, replace it
          this.environmentTypeList[index] = _environmentType;
      } else {
          // No such environment exists, add it
          this.environmentTypeList.push(_environmentType);
      }

    }

    public removeEnvironmentType(_environmentType:IEnvironmentType)
    {
       this.environmentTypeList = this.environmentTypeList.filter(envType => envType.id !== _environmentType.id);
    }

    public setEnvironmentTypeArray(_environmentType:IEnvironmentType[])
    {
       this.environmentTypeList = _environmentType;
    }

    public getAllEnvironmentTypeArray()
    {
       return this.environmentTypeList;
    }
}

export default EnvironmentTypeDataManager;
