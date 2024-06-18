import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  constructor() {}

  async getStates(): Promise<any> {
    try {
      const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getCities(stateId: number): Promise<any> {
    try {
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
