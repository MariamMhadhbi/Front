// src/app/_services/activity-log.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityLog } from '../_models/activity-log.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  private baseUrl = 'http://localhost:8080/api/v1/activity-logs';

  constructor(private http: HttpClient) { }

  logActivity(activityLog: ActivityLog): Observable<void> {
    return this.http.post<void>(this.baseUrl, activityLog);
  }

  getActivityLogs(): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(this.baseUrl);
  }
}
