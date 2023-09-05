import {   
    Body,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { UsersService } from "./users.serviice";
import { UserEnt } from "src/entities/user.entity";
import { ApiOperation } from "@nestjs/swagger";
import { AuthenticateDto } from "src/auth/dto/authenticate.dto";
import { JwtAuthGuard } from "src/auth/jwt.guarrd";

@Controller('user')
export class UserController {
    constructor (
        private readonly UserServices: UsersService
    ) {}
 

    // @UseGuards(JwtAuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //     return req.user
    // }

    @Get()
    async getAll(): Promise<UserEnt[]> {
        return await this.UserServices.findAll()
    }

    @Post('/signup')
    @ApiOperation({
        summary: 'Sign Up'
    })
    @UsePipes(ValidationPipe)
    create(@Body() UserEnt: UserEnt) {
        return this.UserServices.createUsr(UserEnt)
    }

    // @Get("/:userId")
    // async getOneUsr(@Param("userId") userId: number): Promise <UserEnt> {
    //     const user = this.UserServices.findOne(userId)

    //     if (!user) {
    //         throw new NotFoundException()
    //     }
    //     return user
    //
    
    // @Put
    
    // @Post('')

    // @Put('')

    // @UseGuards('')
}