import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

// Zod schema for update user
export const updateUserSchema = z.object({
  email: z
    .string({ invalid_type_error: 'type.email' })
    .min(1, { message: 'required.email' })
    .email({ message: 'invalid.email' })
    .optional(),
  password: z
    .string({ invalid_type_error: 'type.password' })
    .min(1, { message: 'required.password' })
    .min(6, { message: 'invalid.password' })
    .optional(),
  fullName: z
    .string({ invalid_type_error: 'type.fullName' })
    .min(1, { message: 'required.fullName' })
    .min(2, { message: 'invalid.fullName' })
    .optional(),
});

// Type inference
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

// Swagger DTO
export class UpdateUserSwaggerDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'The new password of the user',
    minLength: 6,
    required: false,
  })
  password?: string;

  @ApiProperty({
    example: 'Jane Doe',
    description: 'The full name of the user',
    minLength: 2,
    required: false,
  })
  fullName?: string;
}
