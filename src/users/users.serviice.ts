import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnt } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import { InjectConfig } from 'nestjs-config';

export type User = any;

@Injectable()
export class UsersService {
  private saltRounds: number;

  constructor (
    @InjectRepository(UserEnt)
    private usersRep: Repository <UserEnt>,
    @InjectConfig() private readonly config: ConfigService) {
      this.saltRounds = config.get("app.salt_rounds", 10)
    }
    
    // async findById(userId: number): Promise<UserEnt | null> {
    //   return await this.usersRep.findOneOrFail(userId)
    // }

    async getHash(password: string): Promise<string> {
      return await bcrypt.hash(password, this.saltRounds)
    }

    async create(user: UserEnt): Promise<User> {
      const userToCreate = {
        ...user,
        password: await this.getHash(user.password),
      }

      const result = await this.usersRep.save(
        this.usersRep.create(userToCreate)
      )
      return result


    }

    async findAll(): Promise <UserEnt[]> {
      return await this.usersRep.find();
    }

    // async findOne(username: string, password: string): Promise<User | undefined> {
    //   try {
    //     const user = await this.usersRep.findOne({
    //       where: { username },
    //     })
    //     const isMatch = await bcrypt.compare(password, user.password)
    //     if (user && isMatch) {
    //       return user;
    //     } else {
    //       throw new Error('This user not found')
    //     }
    //   } catch e(err) {
    //     throw new Error('Error finding ${err} user ${err.message}')
    //   }
    // }

    async createUsr(user: UserEnt): Promise<UserEnt> {
      const create = {
        ...user,
      }
      const result = await this.usersRep.save(
        this.usersRep.create(create)
      )
      return result
    }
}

