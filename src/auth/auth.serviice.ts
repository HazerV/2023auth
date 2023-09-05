import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.serviice';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    return await this.usersService.findOne(username, password)
  }

  async signIn(user: any) {
    try {
      const payload = { username: user.username}
      return {
        ...payload,
        token: this.jwtService.sign(payload),
      }
    } catch (error) {
      throw new Error ('Error ${error.message}')
    }
  }

  // async signIn(username, pass) {
  //   const user = await this.usersService.findOne(username, password);
  //   if (user || user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { sub: user.userId, username: user.username };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}


