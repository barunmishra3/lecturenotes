import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/common/services/firebase.service';
import { AuthLogin, AuthRegister } from './dto/auth.dto';

@Injectable()
export class AuthRepository {
    constructor(private fb:FirebaseService){}

    registerUser(det:AuthRegister){
        return new Promise(async(res,rej)=>{
            try {
                const result = await this.fb.addEmailPasswordToAuth(det);
                res(result.uid)
            } catch (error) {
                rej(error)
            }
        })
    }

    loginUser(dets:AuthLogin){
        return new Promise(async(res,rej)=>{
            try {
                const result = await this.fb.getAuthUserByEmail(dets.email);
                res(result.uid)
            } catch (error) {
                rej(error)
            }
        })
    }
 }
