export class BaseFirebaseEntity {
    created_at:number = new Date().getTime();
    updated_at:number = new Date().getTime();
    deleted_at:number = new Date().getTime();
    is_active: boolean = true;
}
