import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private ibgeUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) {}

  getStates(): Observable<any> {
    return this.http.get(`${this.ibgeUrl}/estados`);
  }

  getCities(stateId: number): Observable<any> {
    return this.http.get(`${this.ibgeUrl}/estados/${stateId}/municipios`);
  }
}
