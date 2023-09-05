import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnt } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

export type User = any;

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UserEnt)
    private usersRep: Repository <UserEnt>,
  ) {}
    
    async findAll(): Promise <UserEnt[]> {
      return await this.usersRep.find();
    }

    // async findOne(userId: number): Promise <UserEnt|null> {
    //   return this.usersRep.findOneBy({userId});
    // }

    async findOne(username: string, password: string): Promise<User | undefined> {
      try {
        const user = await this.usersRep.findOne({
          where: { username },
        })
        const isMatch = await bcrypt.compare(password, user.password)
        if (user && isMatch) {
          return user;
        } else {
          throw new Error('This user not found')
        }
      } catch (err) {
        throw new Error('Error finding ${err} user ${err.message}')
      }
    }

    async createUsr(user: UserEnt): Promise<UserEnt> {
      const create = {
        ...user,
      }
      const result = await this.usersRep.save(
        this.usersRep.create(create)
      )
      return result
    }


    // async createOne()

    // regOne( ): Promise <UserEnt>


  // async findOne(username: string): Promise<User | undefined> {
  //   return this.usersRep.find(user => user.username === username);
  // }
}

