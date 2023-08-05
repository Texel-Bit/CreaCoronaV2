import { IGrout } from "../models/grout/grout.model";

class GroutDataManager
{
    private GroutList: IGrout[] = [];

    public getGroutById(id:string)
    {
        return this.GroutList.find(Grout => Grout.id === id);
    }

    public addGrout(_Grout:IGrout)
   {
      if (!this.GroutList.some(grout => grout.id === _Grout.id)) {
         this.GroutList.push(_Grout);
      } 
   }

    public removeGrout(_Grout:IGrout)
    {
       this.GroutList = this.GroutList.filter(Grout => Grout.id !== _Grout.id);
    }

    public setGroutArray(_Grout:IGrout[])
    {
       this.GroutList = _Grout;
    }
}

export default GroutDataManager;