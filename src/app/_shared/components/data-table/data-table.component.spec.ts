import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DataTableConfig } from '../../../core/models/data-table-config.model';
import { User } from '../../../core/models/user';
import { UserRoleEnum } from '../../../core/enums/roles.enum';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        DataTableComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource and columns on ngOnInit', () => {
    const mockData: User[] = [
      {
        id: '1',
        username: 'user1',
        email: 'user1@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
      {
        id: '2',
        username: 'user2',
        email: 'user2@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
    ];
    const mockConfig = new DataTableConfig({
      Data: mockData,
      PageSourceName: 'TestPage',
      Columns: ['username', 'email'],
    });
    component.tableData = mockConfig;
    component.columns = mockConfig.Columns;
    component.ngOnInit();

    fixture.detectChanges();
    expect(component.dataSource.data).toEqual(mockData);
    expect(component.columns).toEqual(['username', 'email']);
    expect(component.dataSource.sort).toBeTruthy();
  });

  it('should apply filter to dataSource', () => {
    const mockData: User[] = [
      {
        id: '1',
        username: 'user1',
        email: 'user1@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
      {
        id: '2',
        username: 'user2',
        email: 'user2@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
      {
        id: '3',
        username: 'user3',
        email: 'user3@example.com',
        role: UserRoleEnum.ADMIN,
      },
    ];
    const mockConfig = new DataTableConfig({
      Data: mockData,
      PageSourceName: 'TestPage',
      Columns: ['username', 'email'],
    });
    component.tableData = mockConfig;
    component.ngOnInit();

    fixture.detectChanges();

    component.applyFilter('user');

    expect(component.dataSource.filteredData).toEqual([
      {
        id: '1',
        username: 'user1',
        email: 'user1@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
      {
        id: '2',
        username: 'user2',
        email: 'user2@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
      {
        id: '3',
        username: 'user3',
        email: 'user3@example.com',
        role: UserRoleEnum.ADMIN,
      },
    ]);
  });

  it('should apply filter based on filterControl value changes', fakeAsync(() => {
    const mockData: User[] = [
      {
        id: '1',
        username: 'apple',
        email: 'a@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
      {
        id: '2',
        username: 'banana',
        email: 'b@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
      {
        id: '3',
        username: 'orange',
        email: 'o@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
    ];
    const mockConfig = new DataTableConfig({
      Data: mockData,
      PageSourceName: 'TestPage',
      Columns: ['username', 'email'],
    });
    component.tableData = mockConfig;
    component.ngOnInit();
    fixture.detectChanges();

    component.filterControl.setValue('ban');
    tick(300); // Wait for debounceTime

    expect(component.dataSource.filteredData).toEqual([
      {
        id: '2',
        username: 'banana',
        email: 'b@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
    ]);

    component.filterControl.setValue('app');
    tick(300);

    expect(component.dataSource.filteredData).toEqual([
      {
        id: '1',
        username: 'apple',
        email: 'a@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
    ]);
  }));

  it('should render the table with provided columns and data', () => {
    const mockData: User[] = [
      {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        role: UserRoleEnum.CUSTOMER,
      },
    ];
    const mockConfig = new DataTableConfig({
      Data: mockData,
      PageSourceName: 'TestPage',
      Columns: ['username', 'email', 'role'],
    });
    component.tableData = mockConfig;
    component.ngOnInit();
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();

    const headerRow = table.querySelector('thead tr');
    expect(headerRow.textContent).toContain('Username');
    expect(headerRow.textContent).toContain('Email');
    expect(headerRow.textContent).toContain('Role');

    const dataRow = table.querySelector('tbody tr');
    expect(dataRow.textContent).toContain('testuser');
    expect(dataRow.textContent).toContain('test@example.com');
    expect(dataRow.textContent).toContain('user');
  });
  
});
