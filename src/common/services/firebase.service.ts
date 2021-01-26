import * as admin from 'firebase-admin';
import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { BaseFirebaseEntity } from 'src/shared/entity/abstract.entity';

const path = require('path');

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app = null;
  private auth: admin.auth.Auth = null;
  private databaseRef: admin.database.Database = null;
  constructor() {}
  
  onModuleInit() {
    try { 
      let jsonPath = null; 
      jsonPath = path.join(    
        __dirname,
        '../../../',
        `src/assets/${process.env.FIREBASE_AUTH_JSON}`,
      );
      this.app = admin.initializeApp({
        credential: admin.credential.cert(jsonPath),
        databaseURL: process.env.DATABASE_URL,
      }); 
      if (this.app == null) {
        console.log('Firebase Initialization failed..'); 
      } else {
        console.log('Firebase Initialized..'); 
        this.auth = admin.auth();
        this.databaseRef = admin.database(); 
      }
    } catch (error) {
      console.log('Firebase Initialization failed..');
    }
  }

  addEmailPasswordToAuth(options: any) {
    options["displayName"] = options["name"];
    return this.auth.createUser(options);
  }
  async getAuthUserByUid(uid) {
    return await this.auth.getUser(uid);
  }
  async getAuthUserByEmail(email) {
    return await this.auth.getUserByEmail(email);
  }


  async getData(path) {
    return new Promise((res, rej) => {
      const ref = this.databaseRef.ref(path);
      ref.on(
        'value',
        function(snapshot) {
          res(snapshot.val());
        },
        function(errorObject) {
          rej(errorObject);
        },
      );
    });
  }
  async updateData(id,path,data){
    return new Promise((res, rej) => {
      const dbRef = this.databaseRef.ref('/').child(path);
      return dbRef.child(id).update(data)
        .then(response => res(response))
        .catch(err => {rej(err);});
  });
  }
  async pushData(path, data): Promise<any> {
    //return this.databaseRef.ref('/').child(path).push(data)
    return new Promise(async (res, rej) => {
      try{
        let key  = this.databaseRef.ref('/').child(path).push(Object.assign(data,new BaseFirebaseEntity())).key;
        res(key);
      }catch(err){
        rej(err);
      }
    });
  }

  getDataByQueryChild(path: string, key: string, value: any) {
    return new Promise((res, rej) => {
      const ref = this.databaseRef.ref(path).orderByChild(key).equalTo(value);
      ref.on("value", function (snapshot) {
        res(snapshot.val());
      }, function (errorObject) {
        rej(errorObject);
      });
    });
  }

}
