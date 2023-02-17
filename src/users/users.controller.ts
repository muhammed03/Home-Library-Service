import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ResUserEntity } from './entities/user.entities';
import { CreateUserDto, UpdatePasswordDto } from './dto/users.dto';

@Controller('user')
export class UsersController {
  constructor(readonly usersService: UsersService) {}
  @Get()
  getAll(): Promise<ResUserEntity[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userData: UpdatePasswordDto) {
    return this.usersService.updateUser(id, userData);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
