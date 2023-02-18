import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';
import { db } from '../repository';
import { ResUserEntity, UserEntity } from './entities/user.entities';
import { FIELDS } from '../core/constants';
import { CreateUserDto, UpdatePasswordDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  async getAll(): Promise<ResUserEntity[]> {
    return db[FIELDS.USERS].map((item) => {
      return {
        id: item.id,
        login: item.login,
        version: item.version,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });
  }

  async getUserById(id: string): Promise<ResUserEntity> {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Not valid userId');
    }

    const user = db[FIELDS.USERS].find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async createUser(userData: CreateUserDto) {
    const newUser: UserEntity = {
      id: uuidV4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...userData,
    };

    db[FIELDS.USERS].push(newUser);
  }

  async updateUser(id: string, updatedUserData: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatedUserData;
    if (!uuidValidate(id)) {
      throw new BadRequestException('Not valid userId');
    }

    const user = db[FIELDS.USERS].find((item) => item.id === id);
    const userIndex = db[FIELDS.USERS].findIndex((item) => item.id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    db[FIELDS.USERS][userIndex] = {
      ...user,
      password: newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    };
  }

  async deleteUser(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Not valid userId');
    }

    const user = db[FIELDS.USERS].find((item) => item.id === id);
    const userIndex = db[FIELDS.USERS].findIndex((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }

    db[FIELDS.USERS].splice(userIndex, 1);
  }
}
