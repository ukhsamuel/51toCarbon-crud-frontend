import { Component, inject, OnInit } from '@angular/core';
import { DataTableComponent } from '../../_shared/components/data-table/data-table.component';
import { UserService } from '../../core/services/user.service';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatCard } from '@angular/material/card';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DataTableConfig } from '../../core/models/data-table-config.model';
import { UserServiceMock } from '../../core/services/user.mock.service';
import { environment } from '../../../environments/environment';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-view-users',
  imports: [DataTableComponent, MatSpinner, MatCard, AsyncPipe, MatIcon],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss',
})
export class ViewUsersComponent implements OnInit {
  // Services
  userService: UserService | UserServiceMock = (environment.mock ? inject(UserServiceMock) : inject(UserService));

  // Observables
  users$!: Observable<DataTableConfig>;
  // Variables
  pageSourceName = 'Viewusers';
  loading: boolean = true;

  // DataTableConfig
  usersDataTable: DataTableConfig = new DataTableConfig({
    Data: [],
    PageSourceName: this.pageSourceName,
    Columns: ['username', 'email', 'role'],
  });

  ngOnInit() {
    this.users$ = this.userService.getUsers().pipe(
      map((users) => {
        return new DataTableConfig({
          Data: users,
          PageSourceName: this.pageSourceName,
          Columns: ['username', 'email', 'role'],
        });
      }),
      tap(() => (this.loading = false)),
      catchError((err) => {
        console.error('Error - getUsers', err);
        this.loading = false;
        return of(this.usersDataTable);
      })
    );
  }
}
