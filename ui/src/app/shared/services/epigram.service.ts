import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Epigram} from '../models/epigram';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EpigramService {
  constructor(
    private client: HttpClient) { }

  /* TODO: Get rid of hard-coded URLs */
  public getRandomEpigram(): Observable<Epigram> {
    return this.client.get<Epigram>("http://localhost:8080/epigrams/random");
  }

  public getEpigram(id: number): Observable<Epigram> {
    return this.client.get<Epigram>(`http://localhost:8080/epigrams/${id}`);
  }

  public getAllEpigrams(): Observable<Epigram[]> {
    return this.client.get<Epigram[]>(`http://localhost:8080/epigrams`);
  }

  public createEpigram(epigram: Epigram): Observable<Epigram> {
    return this.client.post<Epigram>(`http://localhost:8080/epigrams`, epigram);
  }
}
