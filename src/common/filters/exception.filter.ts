import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseService } from '../services/responce.service';



@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let res = new ResponseService();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); 
    const status = exception.getStatus();
    const err:any = exception.getResponse();
    response.send(res.errorResponse(status,err.message))
  }
} 