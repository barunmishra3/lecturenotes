import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthRepository } from './auth.repo';

@Module({
    imports: [CommonModule],
    controllers: [
        AuthController,],
    providers: [
        AuthService,AuthRepository],
})
export class AuthModule { }
