import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcClientModule } from './grpc/grpc-client.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: '.env',
    }),
    GrpcClientModule,
  ],
  providers: [AppService],
})
export class AppModule {}
