import { IEnvironment } from "../models/environment/environment.model";

class EnvironmentDataManager
{
    private environmentList: IEnvironment[] = [];

    public getEnvironmentById(id:string)
    {
        return this.environmentList.find(env => env.id === id);
    }

    public addEnvironment(_environment: IEnvironment): void {
      const index = this.environmentList.findIndex(env => env.id === _environment.id);
  
      if (index !== -1) {
          // Environment with the same id exists, replace it
          this.environmentList[index] = _environment;
      } else {
          // No such environment exists, add it
          this.environmentList.push(_environment);
      }
  }

    public removeEnvironment(_environment:IEnvironment)
    {
       this.environmentList = this.environmentList.filter(env => env.id !== _environment.id);
    }

    public setEnvironmentArray(_environment:IEnvironment[])
    {
       this.environmentList = _environment;
    }

    public GetAllEnvironment()
    {
      return this.environmentList;
    }
}

export default EnvironmentDataManager;
