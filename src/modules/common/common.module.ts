import { Module } from '@nestjs/common';
import { I18nService } from './i18n/i18n.service';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';

@Module({
  providers: [I18nService, ZodValidationPipe],
  exports: [I18nService, ZodValidationPipe],
})
export class CommonModule {}
