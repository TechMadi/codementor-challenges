import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdvice } from '../model/advice.model';

@Injectable({
  providedIn: 'root',
})
export class AdviceService {
  constructor(private http: HttpClient) {}

  getRandomAdvice(): Observable<IAdvice> {
    return this.http.get<IAdvice>(`${environment.server_url}`);
  }

  getAdviceById(slip_id: string) {
    return this.http.get(`${environment.server_url}/${slip_id}`);
  }

  searchAdvice(query: any) {
    return this.http.get(`${environment.server_url}/search/${query}`);
  }
}
