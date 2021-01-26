import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ResponseService } from '../services/responce.service';


@Injectable()
export class ResponceIntercepter implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler){
    let excludePath:Set<string> = new Set();
    let res = new ResponseService();
    let ctx = context.switchToHttp();
    let response = ctx.getResponse();    
    return next.handle().pipe(map(respData =>{  
      return res.successResponse(200,respData.message,respData.data,response);
    }));
  }
}