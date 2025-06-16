import { UsePipes } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { I18nService } from '../i18n/i18n.service';

export const ZodValidate = (schema: ZodSchema) =>
  UsePipes(new ZodValidationPipe(schema, new I18nService()));
