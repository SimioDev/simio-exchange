import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrendingCoinsResponse } from '../interface/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiExchangeService {

  private apiUrl = environment.apiUrlCoins;

  constructor(private http: HttpClient) {}

  getTrendingCoins(): Observable<TrendingCoinsResponse> {
    return this.http.get<TrendingCoinsResponse>(this.apiUrl);
  }
}
