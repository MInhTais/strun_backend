import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { I18nService } from '../common/i18n/i18n.service';

@Injectable()
export class UserService {
  constructor(private readonly i18nService: I18nService) {}

  create(createUserDto: CreateUserDto): ApiResponse<CreateUserDto> {
    return {
      success: true,
      message: this.i18nService.getMessage('user.created'),
      data: createUserDto,
    };
  }

  findAll(): ApiResponse<CreateUserDto[]> {
    return {
      success: true,
      message: this.i18nService.getMessage('user.foundAll'),
      data: [
        {
          email: 'user1@example.com',
          password: 'password123',
          fullName: 'User One',
        },
        {
          email: 'user2@example.com',
          password: 'password456',
          fullName: 'User Two',
        },
      ],
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(id: string): ApiResponse<CreateUserDto> {
    return {
      success: true,
      message: this.i18nService.getMessage('user.found'),
      data: {
        email: 'user@example.com',
        password: 'password123',
        fullName: 'John Doe',
      },
    };
  }

  update(id: string, updateUserDto: UpdateUserDto): ApiResponse<UpdateUserDto> {
    return {
      success: true,
      message: this.i18nService.getMessage('user.updated'),
      data: updateUserDto,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(id: string): ApiResponse<null> {
    return {
      success: true,
      message: this.i18nService.getMessage('user.deleted'),
    };
  }
}
