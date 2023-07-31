import { AxiosResponse } from "axios";

interface ServiceResponse {
    call: Promise<AxiosResponse<any, any>>;
    controller: AbortController;
}

export default ServiceResponse;