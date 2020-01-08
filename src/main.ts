import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Connection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
    },
  });

  await app.get(Connection).query(`
    CREATE TABLE IF NOT EXISTS logs (
        date timestamp default now() NOT NULL,
        info varchar NOT NULL
    );

    DROP TRIGGER IF EXISTS on_add_user on user_entity;
    DROP FUNCTION IF EXISTS log_user();

    CREATE FUNCTION log_user() RETURNS TRIGGER
        LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO logs (date, info) VALUES (DEFAULT, CONCAT('Created user ', new.email));
        RETURN new;
    END
    $$;

    CREATE TRIGGER on_add_user
        AFTER INSERT ON user_entity
        FOR EACH ROW
    EXECUTE PROCEDURE log_user();



    DROP TRIGGER IF EXISTS on_add_security on security_entity;
    DROP FUNCTION IF EXISTS log_security();

    CREATE FUNCTION log_security() RETURNS TRIGGER
        LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO logs (date, info) VALUES (DEFAULT, CONCAT('Created security ', new."fullName"));
        RETURN new;
    END
    $$;

    CREATE TRIGGER on_add_security
        AFTER INSERT ON security_entity
        FOR EACH ROW
    EXECUTE PROCEDURE log_security();
  `);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Exchange API')
    .setSchemes('https', 'http')
    .setVersion('0.1')
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
