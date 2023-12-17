
export interface IQuotationProductDetail {
    Design_idDesign: number,
    quotationProductUnits: number
}

export interface IQuotationDesignColors {
    DesignColors_idDesignColors: number,
    DesignColors_Index: number
}

export interface IQuotationParams {
    DesignColors_has_quotation: Array<IQuotationDesignColors>,
    demo: number,
    idFormatSize: number,
    idFormatSizeTexture: number,
    idstate: number,
    quatitionArea: number,
    quotationHeight: number,
    quotationProductDetails: Array<IQuotationProductDetail>,
    quotationWidth: number,
    customerName: string,
    idbrecha: number,
    Environment_idEnvironment:number,
    customerLastname: string,
    customerEmail: string,
    customerPhoneNumber: string,
    desingPatternImage: BinaryType|null,
    simulationImage: BinaryType|null
}