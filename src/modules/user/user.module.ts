import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repo';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [CommonModule],
    controllers: [
        UserController,],
    providers: [
        UserService,UserRepository],
})
export class UserModule { }
