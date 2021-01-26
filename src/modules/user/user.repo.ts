import { Injectable } from "@nestjs/common";
import { FirebaseService } from "src/common/services/firebase.service"
import { RequestStatus } from "./constants/status.enum";

@Injectable()
export class UserRepository{
    constructor(private fb:FirebaseService){}

    requestUser(sourceUserUid,targetUserUid){
        return new Promise(async(res,rej)=>{
            try {
                const allRequest = await this.getAllRequest(targetUserUid);
                const alredtRequest  = allRequest.find((each) => each.from_user == sourceUserUid);
                if(!alredtRequest){
                    await this.fb.pushData('request',{
                        from_user:sourceUserUid,
                        to_user:targetUserUid,
                        status:RequestStatus.PENDING
                    })
                    res("requested...")
                }else{
                    rej('alredy requested...')
                }
            } catch (error) {
                rej(error)
            }
        })
    }
    getAllRequest(userId):Promise<Array<any>>{
        return new Promise(async(res,rej)=>{
            try {
                let allPendingRequest = [];
                const allRequest:any = await this.fb.getDataByQueryChild('request','to_user',userId)
                for(let key in allRequest){
                    if(allRequest[key].is_active && allRequest[key].status == RequestStatus.PENDING){
                        allRequest[key]["id"] = key;
                        allPendingRequest.push(allRequest[key]);
                    }
                } 
                res(allPendingRequest);
            } catch (error) {
                rej(error)
            }
        })
    }

    getAllAcceptedRequest(userId):Promise<Array<any>>{
        return new Promise(async(res,rej)=>{
            try {
                let allPendingRequest = [];
                const allRequest:any = await this.fb.getData('request');
                for(let key in allRequest){
                    let usr = allRequest[key]
                    if(usr.is_active && usr.status == RequestStatus.ACCEPT&&(usr.from_user == userId || usr.to_user == userId)){
                        allRequest["id"] = key;
                        allPendingRequest.push(allRequest[key]);
                    } 
                } 
                res(allPendingRequest);
            } catch (error) {
                rej(error)
            }
        })
    }
    upadateRequest(reqId){
        return new Promise(async(res,rej)=>{
            try {
                const reqDetails = await this.fb.getData(`request/${reqId}`);
                if(reqDetails){
                    await this.fb.updateData(reqId,'request',{
                        status:RequestStatus.ACCEPT,
                        updated_at:new Date().getTime()
                    })
                    res('Accepted')
                }else{
                    rej('No req found...')
                }
            } catch (error) {
                
            }
        })
    }
}