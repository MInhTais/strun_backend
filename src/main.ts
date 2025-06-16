import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Set global prefix
  app.setGlobalPrefix('api');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Strun API')
    .setDescription('The Strun API description')
    .setVersion('1.0')
    .addBearerAuth()
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors();

  const port = configService.get('PORT');
  await app.listen(port);

  // Log server information
  console.log(chalk.green('\n🚀 Server is running!'));
  console.log(configService.get('PORT'));
  console.log(chalk.blue(`📡 Port: ${port}`));
  console.log(chalk.blue(`🌐 Base URL: http://localhost:${port}/api`));
  console.log(chalk.magenta('\n📋 Available endpoints:'));
  console.log(chalk.cyan(`   GET    /api/users/findAll`));
  console.log(chalk.cyan(`   POST   /api/users/create`));
  console.log(chalk.cyan(`   GET    /api/users/:id`));
  console.log(chalk.cyan(`   PUT    /api/users/:id`));
  console.log(chalk.cyan(`   DELETE /api/users/:id`));
  console.log('\n');

  console.log(
    chalk.green(`Application is running on: http://localhost:${port}`),
  );
  console.log(
    chalk.green(
      `Swagger documentation is available at: http://localhost:${port}/api`,
    ),
  );
}
void bootstrap();
