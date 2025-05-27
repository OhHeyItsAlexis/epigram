import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Epigram} from '../models/epigram';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EpigramService {
  constructor(
    private client: HttpClient) { }

  public getRandomEpigram(): Observable<Epigram> {
    return this.client.get<Epigram>("http://localhost:8080/epigrams/random")
  }
}
