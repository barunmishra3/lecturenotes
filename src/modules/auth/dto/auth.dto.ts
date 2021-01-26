import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthRegister{

    @IsNotEmpty()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @ApiProperty()
    password:string;

    @IsNotEmpty()
    @ApiProperty()
    name:string;

}

export class AuthLogin{

    @IsNotEmpty()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @ApiProperty()
    password:string;
}