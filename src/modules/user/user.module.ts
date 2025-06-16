import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { I18nService } from '../common/i18n/i18n.service';

@Module({
  controllers: [UserController],
  providers: [UserService, I18nService],
})
export class UserModule {}
