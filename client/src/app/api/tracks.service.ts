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

  public changeOrder(way: string, order: Number): Observable<any> {
    return this.httpClient.post(`${this.API}/tracks/shift/${order}/${way}`, {});
  }

  public updateTrackData(id: any, trackData: Object): Observable<any> {
    return this.httpClient.post(`${this.API}/tracks/edit/${id}`, trackData);
  }

  public deleteTrack(id: any) {
    return this.httpClient.delete(`${this.API}/tracks/delete/${id}`, {});
  }
}
