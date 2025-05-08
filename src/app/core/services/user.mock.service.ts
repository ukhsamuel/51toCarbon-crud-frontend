import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { UserRoleEnum } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class UserServiceMock {
  getUsers(): Observable<User[]> {
    const mockUsers: User[] = Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      username: faker.person.firstName(),
      email: faker.internet.email(),
      role: UserRoleEnum.CUSTOMER,
    }));
    return of(mockUsers);
  }
}
