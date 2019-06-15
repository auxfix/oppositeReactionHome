import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TracksService {

  API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getAllNews(): Observable<any> {
    return this.httpClient.get(`${this.API}/news`);
  }

  public postNews(newsItem: Object): Observable<any> {
    return this.httpClient.post(`${this.API}/news`, newsItem);
  }

  public editNews(id: string, order: Number): Observable<any> {
    return this.httpClient.put(`${this.API}/news/${id}`, {});
  }

  public deleteNews(id: string): Observable<any> {
    return this.httpClient.delete(`${this.API}/news/${id}`);
  }
}
