import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TracksService {

  API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getAllTracks(): Observable<any> {
    return this.httpClient.get(`${this.API}/tracks`);
  }

  public uploadTrack(trackData: FormData): Observable<any> {
    return this.httpClient.post(`${this.API}/tracks`, trackData);
  }
}
