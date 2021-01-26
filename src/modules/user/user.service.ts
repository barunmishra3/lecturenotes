import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repo';

@Injectable()
export class UserService { 
    constructor(private userRepo:UserRepository){}

    async request(sourceUserId,destUserId){
        try {
            const result = await this.userRepo.requestUser(sourceUserId,destUserId);
            return {
                data:result,
                message:"User Requested Successfully..."
            }
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    

    async getAllRequest(id){
        try {
            const result = await this.userRepo.getAllRequest(id);
            return {
                data:result,
                message:"Requests Successfully..."
            }
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async acceptRequest(id){
        try {
            const result = await this.userRepo.upadateRequest(id);
            return {
                data:result,
                message:"Requests accepted Successfully..."
            }
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async acceptedRequest(id){
        try {
            const result = await this.userRepo.getAllAcceptedRequest(id);
            return {
                data:result,
                message:"Requests Fetched Successfully..."
            }
        } catch (error) {
            throw new NotFoundException(error);
        }
    }


}
