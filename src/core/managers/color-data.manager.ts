import { IColor } from "../models/color/color.model";

class ColorDataManager
{
    private colorList: IColor[] = [];

    public getColorById(id:string)
    {
        return this.colorList.find(color => color.id === id);
    }

    public addColor(_color: IColor) {
      if (!this.colorList.some(color => color.id === _color.id)) {
          this.colorList.push(_color);
      } 
  }

    public removeColor(_color:IColor)
    {
       this.colorList = this.colorList.filter(color => color.id !== _color.id);
    }

    public removeALlColors()
    {
      this.colorList=[]
    }

    public GetAllColors(isFullField: boolean) {
      return this.colorList.filter(color => color.isFullField === isFullField);
   }

    public setColorArray(_color:IColor[])
    {
       this.colorList = _color;
    }
}

export default ColorDataManager;