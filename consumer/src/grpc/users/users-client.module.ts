import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { UsersService } from './users.service';
import { USERS_PACKAGE_NAME } from 'src/types/users';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USERS_PACKAGE_NAME,
        inject: [ConfigService],
        useFactory: (configService: ConfigService<AppConfig>) => ({
          transport: Transport.GRPC,
          options: {
            package: USERS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/users.proto'),
            url: configService.getOrThrow<string>('userProducerGrpcURL', {
              infer: true,
            }),
          },
        }),
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersClientModule {}
