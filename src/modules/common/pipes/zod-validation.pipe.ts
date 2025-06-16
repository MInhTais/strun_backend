import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';
import { I18nService } from '../i18n/i18n.service';

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(
    private schema: ZodSchema,
    private i18nService: I18nService,
  ) {}

  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    // Chỉ validate nếu là body
    if (metadata.type !== 'body') {
      return value;
    }

    try {
      return this.schema.parse(value);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        // Lọc các lỗi trùng lặp dựa trên field
        const uniqueErrors = error.errors.reduce(
          (acc, err) => {
            const field = err.path.join('.');
            if (!acc[field]) {
              acc[field] = err;
            }
            return acc;
          },
          {} as Record<string, (typeof error.errors)[0]>,
        );

        const errorMessage: ValidationError[] = Object.values(uniqueErrors).map(
          err => {
            // Get message key based on error code
            let messageKey = '';
            switch (err.code) {
              case 'invalid_type':
                messageKey = `type.${err.path[0]}`;
                break;
              case 'too_small':
                messageKey = `invalid.${err.path[0]}`;
                break;
              case 'custom':
                messageKey = err.message;
                break;
              default:
                messageKey = `required.${err.path[0]}`;
            }

            return {
              field: err.path.join('.'),
              message: this.i18nService.getMessage(messageKey),
              code: err.code,
            };
          },
        );

        throw new BadRequestException({
          success: false,
          message: this.i18nService.getMessage('validation.failed'),
          error: {
            code: 'VALIDATION_ERROR',
            details: errorMessage,
            timestamp: new Date().toISOString(),
          },
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
