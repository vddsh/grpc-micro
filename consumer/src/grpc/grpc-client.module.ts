import { Module } from '@nestjs/common';
import { UsersClientModule } from './users/users-client.module';

@Module({
  imports: [UsersClientModule],
  exports: [UsersClientModule],
})
export class GrpcClientModule {}
