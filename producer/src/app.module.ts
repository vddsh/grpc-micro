import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
