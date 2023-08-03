
export interface IQuotationProductDetail {
    Design_idDesign: number,
    quotationProductUnits: number
}

export interface IQuotationDesignColors {
    DesignColors_idDesignColors: number,
    esignColors_Index: number
}

export interface IQuotationParams {
    DesignColors_has_quotation: Array<IQuotationDesignColors>,
    demo: number,
    idFormatSize: number,
    idFormatSizeTexture: number,
    idstate: number,
    quatitionArea: number,
    quotationHeight: string,
    quotationProductDetails: Array<IQuotationProductDetail>,
    quotationWidth: string,
    customerName: string,
    idbrecha: number,
    customerLastname: string,
    customerEmail: string,
    customerPhoneNumber: string,
    desingPatternImage: BinaryType,
    simulationImage: BinaryType
}