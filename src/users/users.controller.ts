import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    const user = new User();
    user.email = userDto.email;
    user.password = userDto.password;
    user.banReason = userDto.banReason;
    return this.userService.create(user);
  }

  @Get()
  getAll() {
    return this.userService.findAll();
  }
}
