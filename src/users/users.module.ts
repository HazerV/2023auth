import { Module } from "@nestjs/common";
import { UsersService } from "./users.serviice";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEnt } from "src/entities/user.entity";
import { UserController } from "./users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UserEnt])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})

export class UsersModule { }
 