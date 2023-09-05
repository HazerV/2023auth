import { IsNotEmpty, IsString } from "class-validator";

export class AuthenticateDto {


    @IsNotEmpty({
        message: 'Username is required',
    })
    username: string

    

    @IsNotEmpty()
    @IsString()
    readonly password: string
}

// @IsNotEmpty()
    // @IsString()
    // readonly username: string;



