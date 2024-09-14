import { Component, OnInit } from '@angular/core';
import { ApiExchangeService } from 'src/app/services/api-exchange.service';
import { CoinGeckoApiResponse, CoinGeckoResponse } from '../../interface/interface';

@Component({
  selector: 'app-divisas',
  templateUrl: './divisas.component.html',
  styleUrls: ['./divisas.component.scss']
})
export class DivisasComponent implements OnInit {

  public cryptoData: CoinGeckoApiResponse | undefined;

  constructor(private apiExchangeService: ApiExchangeService) {}

  ngOnInit(): void {

    this.apiExchangeService.getCryptoData().subscribe({
      next: (response: CoinGeckoApiResponse) => {
        console.log('API Response:', response);
        this.cryptoData = response;
      },
      error: (err) => {
        console.error('Error fetching data', err);
      }
    });
  }

  getCryptoKeys(): string[] {
    if (this.cryptoData) {
      return this.cryptoData.map((crypto: CoinGeckoResponse) => crypto.id);
    }
    return [];
  }

  getCryptoName(cryptoId: string): string {
    const crypto = this.cryptoData?.find((c: CoinGeckoResponse) => c.id === cryptoId);
    return crypto ? crypto.name : 'Unknown Crypto';
  }
}
