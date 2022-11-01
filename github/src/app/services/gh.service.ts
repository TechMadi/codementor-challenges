import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class GhService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.server_url}`);
  }

  searchUsers(searchTerm: string): Observable<IUser> {
    return this.http.get<IUser>(`${environment.server_url}/${searchTerm}`);
  }
}
