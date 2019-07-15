import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class TracksService {

  API = environment.api;

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

  public doFrontPageTrack(id: string) {
    return this.httpClient.post(`${this.API}/tracks/front/${id}`, {}, {responseType: 'text'});
  }

  public getFrontPageTrack() {
    return this.httpClient.get(`${this.API}/tracks/front`);
  }
}
