import { IFormat } from "../models/format/format.model";

class FormatDataManager
{
    private formatList: IFormat[] = [];

    public getFormatById(id:string)
    {
        return this.formatList.find(format => format.id === id);
    }

    public addFormat(_format:IFormat)
    {
       this.formatList.push(_format);
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