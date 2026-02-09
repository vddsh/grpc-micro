import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from './grpc/users/users.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private usersService: UsersService) {}

  async onApplicationBootstrap() {
    const response = await this.usersService.getFilteredUsers({});
    console.log('Users on startup:', response.users);
  }
}
