import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SecuritiesModule } from './securities/securities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({

    }),
    AuthModule,
    SecuritiesModule,
  ],
})
export class AppModule {}
