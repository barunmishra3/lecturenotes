import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLogin, AuthRegister } from './dto/auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private auth:AuthService){}
    @Post('register') 
    async registerUser(@Body()reg:AuthRegister){ 
        return await this.auth.registerUser(reg);
    }

    @Post('login') 
    async loginUser(@Body()reg:AuthLogin){ 
        return await this.auth.loginUser(reg);
    }
}
