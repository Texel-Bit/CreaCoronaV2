import { IQuotationParams } from "../models/quotation/quotation.model";
import { postRequest } from "./base.service"


export const simulateQuotation = (quotationParams: IQuotationParams) =>
    postRequest("quotation/simulateQuotation", quotationParams);


export const createQuotation = (quotationParams: IQuotationParams) =>
    postRequest("quotation/createquotation", quotationParams);