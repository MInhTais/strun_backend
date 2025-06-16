import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

// Zod schema for create user
export const createUserSchema = z.object({
  email: z
    .string({
      required_error: 'required.email',
      invalid_type_error: 'type.email',
    })
    .min(1, { message: 'required.email' })
    .email({ message: 'invalid.email' }),
  password: z
    .string({
      required_error: 'required.password',
      invalid_type_error: 'type.password',
    })
    .min(1, { message: 'required.password' })
    .min(6, { message: 'invalid.password' }),
  fullName: z
    .string({
      required_error: 'required.fullName',
      invalid_type_error: 'type.fullName',
    })
    .min(1, { message: 'required.fullName' })
    .min(2, { message: 'invalid.fullName' }),
});

// Type inference
export type CreateUserDto = z.infer<typeof createUserSchema>;

// Swagger DTO
export class CreateUserSwaggerDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    minLength: 6,
  })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user',
    minLength: 2,
  })
  fullName: string;
}
