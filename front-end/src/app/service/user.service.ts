import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({providedIn: 'root'})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.host}/user/get/${id}`);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.host}/user/update`, user);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.host}/user/delete/${id}`);
  }

}
