import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterviewsService {
  private apiUrl = 'http://[::1]:3000/interviews';

  constructor(private http: HttpClient) {}

  getInterviews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
