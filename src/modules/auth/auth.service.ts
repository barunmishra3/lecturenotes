import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from 'src/common/services/firebase.service';
import { AuthRepository } from './auth.repo';
import { AuthLogin, AuthRegister } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private authRepo:AuthRepository){}

    async registerUser(det:AuthRegister){
        try {
            const result = await this.authRepo.registerUser(det);
            return {
                data:result,
                message:"User Registered Successfully..."
            }
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async loginUser(log:AuthLogin){
        try {
            const result = await this.authRepo.loginUser(log);
            return {
                data:result,
                message:"User Login Successfully..."
            }
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
 }
