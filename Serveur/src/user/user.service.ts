import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(register: RegisterDto) {
    const salt = await bcrypt.genSalt();
    const user: User = new User();
    user.firstname = register.firstname;
    user.lastname = register.lastname;
    user.password = await bcrypt.hash(register.password, salt);
    user.email = register.email;
    return this.usersRepository.save(user);
  }

  async loginUser(login: LoginDto) {
    const { email } = login;

    return this.usersRepository.findOne({
      where: { email: email},
    });
  }

  
  async findAllUser():Promise<UserDto[]>{
    const users = await this.usersRepository.find();
    return users.map(user => {
      const userResponse = new UserDto();
      userResponse.id = user.id;
      userResponse.email = user.email;
      userResponse.firstname = user.firstname;
      userResponse.lastname = user.lastname;
      return userResponse;
    })
  }
}
