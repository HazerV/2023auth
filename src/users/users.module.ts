import { Module } from "@nestjs/common";
import { UsersService } from "./users.serviice";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([UsersService])],
  providers: [UsersService],
  exports: [UsersService],
})

export class UsersModule {}