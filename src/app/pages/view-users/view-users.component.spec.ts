import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUsersComponent } from './view-users.component';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { UserServiceMock } from '../../core/services/user.mock.service';
import { UserService } from '../../core/services/user.service';
import { DataTableConfig } from '../../core/models/data-table-config.model';

describe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let userService: UserService | UserServiceMock;
  let fixture: ComponentFixture<ViewUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: UserService, useClass: UserServiceMock }, provideHttpClient()],
      imports: [ViewUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewUsersComponent);
    userService = TestBed.inject(UserService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize users$ with data from userService.getUsers()', () => {
    spyOn(userService, 'getUsers').and.returnValue(of([]));

    fixture.detectChanges();

    component.users$.subscribe((dataTableConfig: DataTableConfig) => {
      expect(dataTableConfig.Data.length).toEqual(10);
      expect(component.loading).toBeFalsy();
    });
  });

  it('should set loading to false after successful data retrieval', () => {
    spyOn(userService, 'getUsers').and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.loading).toBeFalsy();
  });

  it('should set loading to false after an error occurs', () => {
    const error = new Error('Failed to fetch users');
    spyOn(userService, 'getUsers').and.returnValue(throwError(() => error));

    fixture.detectChanges();

    expect(component.loading).toBeFalsy();
  });

  it('should display the data table when users$ emits data', () => {
    spyOn(userService, 'getUsers').and.returnValue(of([]));

    fixture.detectChanges();
    const dataTable = fixture.nativeElement.querySelector('app-data-table');
    expect(dataTable).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });
  

});
