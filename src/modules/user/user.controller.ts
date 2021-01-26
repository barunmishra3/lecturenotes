import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController { 
    constructor(private user:UserService){}
    @Post("request/:source/:destination")
    async requestUser(@Param('source')source:string,@Param('destination')destination:string){
        return await this.user.request(source,destination);
    }

    @Get("request/:id")
    async getRequests(@Param('id')id:string){
        return await this.user.getAllRequest(id);
    }

    @Put("request/:id")
    async updateRequest(@Param('id')id:string){
        return await this.user.acceptRequest(id); 
    }

    @Get('friends/:id')
    async getAllFriends(@Param('id')id:string){
        return await this.user.acceptedRequest(id);
    }
}
