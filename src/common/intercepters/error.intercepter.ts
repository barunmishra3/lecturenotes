import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadGatewayException,
    NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';;

  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next
        .handle()
        .pipe(
          catchError(
            err => this.handleErr(context,err)),
        ); 
    }

    handleErr(context:any,err):any{
      const ctx:any = context.switchToHttp();
     throw new NotFoundException(err.message);
    }
  }
  
  
  