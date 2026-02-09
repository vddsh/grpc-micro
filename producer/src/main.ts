import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { USERS_PACKAGE_NAME } from './types/users';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USERS_PACKAGE_NAME,
        protoPath: join(__dirname, '../proto/users.proto'),
        url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
        loader: {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneof: true,
        },
      },
    },
  );
  await app.listen();
  console.log(
    `producer microservice is running on ${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
  );
}

void bootstrap();
