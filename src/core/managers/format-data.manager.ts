import { IFormat } from "../models/format/format.model";

class FormatDataManager
{
    private formatList: IFormat[] = [];

    public getFormatById(id:number)
    {
        return this.formatList.find(format => format.id === id);
    }

    public addFormat(_format: IFormat) {
      if (!this.formatList.some(format => format.id === _format.id)) {
          this.formatList.push(_format);
      } 
  }
  

    public getAllFormat() {
      return this.formatList;
  }

    public deleteFormats()
    {
       this.formatList=[]
    }

    public removeFormat(_format:IFormat)
    {
       this.formatList = this.formatList.filter(format => format.id !== _format.id);
    }

    public setFormatArray(_format:IFormat[])
    {
       this.formatList = _format;
    }
}

export default FormatDataManager;