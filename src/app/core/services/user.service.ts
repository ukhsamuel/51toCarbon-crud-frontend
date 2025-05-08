import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { catchError, map, Observable, ObservableInput, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserResponseModel } from '../models/user-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  baseUrl = environment.api + environment.version;

  getUsers(): Observable<User[]> {
    return this.http.get<UserResponseModel>(this.baseUrl + '/users').pipe(
      map(response => response.data),
      catchError(error => {
        console.error('ERROR - getUsers -', error);
        return throwError(() => error);
      })
    );
  }
}
