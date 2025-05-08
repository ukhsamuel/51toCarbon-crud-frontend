import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { UserResponseModel } from '../models/user-response.model';
import { User } from '../models/user';
import { faker } from '@faker-js/faker';
import { UserRoleEnum } from '../enums/roles.enum';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  const baseUrl = environment.api + environment.version;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users from the API', () => {
    const mockUsers: User[] = Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      username: faker.person.firstName(),
      email: faker.internet.email(),
      role: UserRoleEnum.CUSTOMER,
    }));

    const mockResponse: UserResponseModel = {
      data: mockUsers,
      message: 'successful load',
      status: 'success',
      statusCode: 200,
    };

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne(baseUrl + '/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle errors when retrieving users', () => {
    const errorMessage = 'Failed to retrieve users';

    service.getUsers().subscribe({
      next: () => {
        fail('should have failed with an error');
      },
      error: error => {
        expect(error.message).toContain(errorMessage);
      },
    });

    const req = httpTestingController.expectOne(baseUrl + '/users');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'), { status: 500, statusText: errorMessage });
  });


  it('should handle an empty response', () => {
    const mockResponse: UserResponseModel = {
      data: [],
      message: 'successful load',
      status: 'success',
      statusCode: 200,
    };
    service.getUsers().subscribe(users => {
      expect(users).toEqual([]);
    });

    const req = httpTestingController.expectOne(baseUrl + '/users');
    req.flush(mockResponse);
  });
});
