import { UserModule } from './modules/user/user.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV,
    }),
    CommonModule,
    AuthModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
