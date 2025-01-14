import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, filter, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private readonly http: HttpClient) { }

  login(username: string, password: string): Observable<{ message: string, status: number}> {
    return this.http.post<HttpResponse<string>>('/auth', { username, password }).pipe(
      filter(res => res.status === 200),
      map(() => ({ message: username, status: 200 })),
      catchError((err: HttpResponse<any>) => {
        if (err.status === 401) {
          return of({ message: 'Bad username or password', status: 401 })
        }

        return of({ message: `error during the auth, status code: ${err.status}`, status: err.status })
      })
    )
  }
}
