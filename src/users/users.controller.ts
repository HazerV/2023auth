import {   
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.serviice";

@Controller('user')
export class UserController {
    constructor (
        private readonly UserServices: UsersService
    ) {}

    @Get ('id')
}