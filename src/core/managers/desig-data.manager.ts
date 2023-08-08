import { IDesign } from "../models/design/design.model";

class DesignDataManager
{
    private designList: IDesign[] = [];

    public getDesignById(id:number)
    {
        return this.designList.find(design => design.id === id);
    }

    public getAllDesigns()
    {
        return this.designList;
    }
    
    public addDesign(_design:IDesign)
    {
        // Check if the design already exists in the list
        const existingDesign = this.designList.find(design => design.id === _design.id);
    
        // If the design does not already exist, add it to the list
        if (!existingDesign) {
            this.designList.push(_design);
        } 
    }

    public removeDesign(_design:IDesign)
    {
       this.designList = this.designList.filter(design => design.id !== _design.id);
    }


    public ClearDesigns()
    {
       this.designList=[]
    }


    public setDesignArray(_design:IDesign[])
    {
       this.designList = _design;
    }
}

export default DesignDataManager;