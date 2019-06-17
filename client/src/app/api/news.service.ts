import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {

  API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getAllNews(): Observable<any> {
    return this.httpClient.get(`${this.API}/news`);
  }

  public getNewsItem(id: string): Observable<any> {
    return this.httpClient.get(`${this.API}/news/${id}`);
  }

  public postNews(newsItem: Object): Observable<any> {
    return this.httpClient.post(`${this.API}/news`, newsItem, {responseType: 'text'});
  }

  public editNews(id: string, newsData: Object): Observable<any> {
    return this.httpClient.put(`${this.API}/news/${id}`, newsData, {responseType: 'text'});
  }

  public deleteNews(id: string): Observable<any> {
    return this.httpClient.delete(`${this.API}/news/${id}`, {responseType: 'text'});
  }
}
