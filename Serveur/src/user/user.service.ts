import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

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
    user.username = register.username;
    return this.usersRepository.save(user);
  }

  async loginUser(login: LoginDto) {
    const { username } = login;

    return this.usersRepository.findOne({
      where: { username: username },
    });
  }

  
  findAllUser(){
    return this.usersRepository.query("SELECT * FROM public.user");
  }
}
