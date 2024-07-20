import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../_models/document.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/api/v1/documents`;

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/own`);
  }

  downloadDocument(id: number): Observable<Blob> {
    const url = `${this.apiUrl}/download/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  sendEmail(id: number, email: string): Observable<any> {
    const url = `${this.apiUrl}/send/${id}`;
    let params = new HttpParams().set('email', email);
    return this.http.post(url, null, { params });
  }
  viewDocument(id: number): Observable<Blob> {
    const url = `${this.apiUrl}/view/${id}`;
    return this.http.get(url, { responseType: 'blob' });
}
deleteDocument(id: number): Observable<void> {
  const url = `${this.apiUrl}/delete/${id}`;
  return this.http.delete<void>(url);
}

}
