import { Component, OnInit } from '@angular/core';
import { TrendingCoinItem } from 'src/app/interface/interface';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  public favoriteCoins: TrendingCoinItem[] = [];
  ngOnInit(): void {
    this.loadFavoriteCoins();
  }

  loadFavoriteCoins(): void {
    this.favoriteCoins = JSON.parse(localStorage.getItem('savedCoins') || '[]');
  }

  removeCoin(coinId: string): void {
    const savedCoins = JSON.parse(localStorage.getItem('savedCoins') || '[]');
    const updatedCoins = savedCoins.filter((coin: TrendingCoinItem) => coin.id !== coinId);
    
    localStorage.setItem('savedCoins', JSON.stringify(updatedCoins));
    this.loadFavoriteCoins();
  }
  

}
