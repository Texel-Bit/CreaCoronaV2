import { IDesign } from "../models/design/design.model";

class DesignDataManager
{
    private designList: IDesign[] = [];

    public getDesignById(id:string)
    {
        return this.designList.find(design => design.id === id);
    }

    public addDesign(_design:IDesign)
    {
       this.designList.push(_design);
    }

    public removeDesign(_design:IDesign)
    {
       this.designList = this.designList.filter(design => design.id !== _design.id);
    }

    public setDesignArray(_design:IDesign[])
    {
       this.designList = _design;
    }
}

export default DesignDataManager;