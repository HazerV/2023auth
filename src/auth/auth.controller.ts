import { 
    Body, 
    Controller, 
    HttpCode, 
    HttpStatus,
    Post,
    Get,
    Request,
    UseGuards   
} from "@nestjs/common";
import { AuthService } from "./auth.serviice";
import { AuthGuard } from "./auth.guards";
import { APP_GUARD } from "@nestjs/core";

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string,any>) {
        return this.authService.signIn(signInDto.username, signInDto.password)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }
}

