import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/exception.filter';
import { ErrorsInterceptor } from './intercepters/error.intercepter';
import { ResponceIntercepter } from './intercepters/responce.incepter';
import { FirebaseService } from './services/firebase.service';
import { ResponseService } from './services/responce.service';

@Module({
    imports: [],
    controllers: [],
    providers: [FirebaseService,ResponseService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponceIntercepter 
          },
          {
            provide:APP_INTERCEPTOR,
            useClass:ErrorsInterceptor
            
          },
          {
            provide:APP_FILTER,
            useClass:HttpExceptionFilter
            
          },
    ],
    exports:[
        FirebaseService,ResponseService,
       
    ]
})
export class CommonModule {}
