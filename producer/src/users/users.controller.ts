import { Controller } from '@nestjs/common';
import { UserService } from './users.service';
import {
  GetFilteredUsersResponse,
  UserServiceController,
} from 'src/types/users';
import { UserServiceControllerMethods } from '../types/users';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  getFilteredUsers():
    | Promise<GetFilteredUsersResponse>
    | Observable<GetFilteredUsersResponse>
    | GetFilteredUsersResponse {
    return this.userService.getFilteredUsers();
  }
}
