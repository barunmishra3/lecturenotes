import { Injectable} from '@nestjs/common';
import { ResponseModel } from '../model/responce.model';



@Injectable()
export class ResponseService {
    errorResponse(status: number, message: string){
        const errorDto: ResponseModel = {  
            status: status,
            message: message,
            data: null,
            type: 'FAILURE'
        };
        return errorDto;
    }

    successResponse(status: number, message: string, data: any, res: any){
        const responseDto: ResponseModel = {
            status: status,
            message: message,
            data: data,
            type: 'SUCCESS'
        };
        return responseDto;  
    }
}
