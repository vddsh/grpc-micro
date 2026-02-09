import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  UserServiceClient,
  USERS_PACKAGE_NAME,
  GetFilteredUsersRequest,
  GetFilteredUsersResponse,
} from 'src/types/users';

@Injectable()
export class UsersService implements OnModuleInit {
  private grpcService: UserServiceClient;

  constructor(@Inject(USERS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.grpcService = this.client.getService<UserServiceClient>('UserService');
  }

  getFilteredUsers(
    request: GetFilteredUsersRequest,
  ): Promise<GetFilteredUsersResponse> {
    return firstValueFrom(this.grpcService.getFilteredUsers(request));
  }
}
