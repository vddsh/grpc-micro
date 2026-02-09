import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { GetFilteredUsersResponse, User } from 'src/types/users';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly logger = new Logger(UserService.name);
  private users: User[] = [];
  private readonly MIN_ALLOWED_AGE: number = 18;

  async onModuleInit() {
    await this.loadUsers();
  }

  getFilteredUsers(): GetFilteredUsersResponse {
    this.logger.debug(`filtering users by age > ${this.MIN_ALLOWED_AGE}`);

    const filteredUsers: User[] = this.filterUersByAge(this.MIN_ALLOWED_AGE);

    this.logger.log(
      `init users count: ${this.users.length}, remain after filter ${filteredUsers.length}`,
    );

    return { users: filteredUsers };
  }

  private async loadUsers(): Promise<void> {
    try {
      const filePath: string = join(__dirname, '../data/users.json');
      this.logger.log(`loading files from ${filePath}`);

      const data = await readFile(filePath, 'utf-8');
      const users: User[] = JSON.parse(data) as User[];
      this.users = users;

      this.logger.log('users has been loaded');
    } catch (err: unknown) {
      this.logger.error('failed to load users from file', err);
      throw new Error('failed to load users');
    }
  }

  filterUersByAge(allowedAge: number): User[] {
    const filteredUsers: User[] = [];

    for (let i = 0; i < this.users.length; i++) {
      const user: User = this.users[i];
      if (user.age > allowedAge) {
        filteredUsers.push(user);
      }
    }

    return filteredUsers;
  }
}
