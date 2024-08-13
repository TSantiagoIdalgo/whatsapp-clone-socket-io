import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as cors from 'cors'
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.use(cors({ origin: '*' }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  const config = new DocumentBuilder()
    .setTitle('Whatsapp-clone')
    .setDescription('This is a WhatsApp replica to learn how to use socket.io')
    .setVersion('1.0')
    .addTag('Whatsapp-clone')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
