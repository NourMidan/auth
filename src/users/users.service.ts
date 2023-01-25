import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  register(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  login() {
    return `This action returns all users`;
  }

  validateUser() {
    return `This action returns a # user`;
  }

}
