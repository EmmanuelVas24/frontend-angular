import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobsService {
  private apiUrl = 'http://[::1]:3000/jobs';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
