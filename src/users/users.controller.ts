import {   
    Body,
    Controller,
    Get,
    Post,
    UnprocessableEntityException,
    UseGuards,
    UsePipes,
    ValidationPipe
    
    // Put,
    // HttpStatus,
    // NotFoundException,
    // Param,
} from "@nestjs/common";
import { UsersService } from "./users.serviice";
import { UserEnt } from "src/entities/user.entity";
import { ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.guarrd";
import { AuthGuard } from "@nestjs/passport";

@Controller('user')
export class UserController {
    constructor (
        private readonly UserServices: UsersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
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

    @Post()
    @UseGuards(AuthGuard("jwt"))
    async addUser(
        @Body(new ValidationPipe()) UserEnt: UserEnt
    ): Promise<UserEnt> {
        const user = await this.UserServices.findById(UserEnt.userId)

        if (user) {
            throw new UnprocessableEntityException() 
        }

        return await this.UserServices.create(UserEnt)
    }

    // @Get("/:userId")
    // async getOneUsr(@Param("userId") userId: number): Promise <UserEnt> {
    //     const user = this.UserServices.findOne(userId)

    //     if (!user) {
    //         throw new NotFoundException()
    //     }
    //     return user
    // }    
}