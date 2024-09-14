import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoinGeckoApiResponse } from '../interface/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiExchangeService {

  private apiUrl = environment.apiUrlCoins+'/markets';

  constructor(private http: HttpClient) {}

  getCryptoData(): Observable<CoinGeckoApiResponse> {
    let params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('ids', 'bitcoin,ethereum,ripple'); // Ajusta según las criptomonedas que quieras incluir

    return this.http.get<CoinGeckoApiResponse>(this.apiUrl, { params });
  }
}
