import { Module } from "@nestjs/common";
import { AuthService } from "./auth.serviice";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guards";

// import { TypeOrmModule } from "@nestjs/typeorm";


@Module ({
  imports: [ 
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.sercet,
      signOptions: { expiresIn: '60s'},
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService], 
})
export class AuthModule {}

// https://leetcode.com/