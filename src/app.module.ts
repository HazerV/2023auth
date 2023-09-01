import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";    
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";

@Module ({
    imports: [
        TypeOrmModule.forRoot ({
            type: 'postgres',   
            host: 'localhost',
            port: 5432,
            username: 'vova',
            password: '1234', 
            database: 'auth',
            autoLoadEntities: true, 
            synchronize: true,
        }),
        UsersModule,
        JwtModule,
        AuthModule
    ]
})

export class AppModule {}

TypeOrmModule