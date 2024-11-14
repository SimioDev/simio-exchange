import { Component, OnInit, HostListener } from '@angular/core';
import { ApiExchangeService } from 'src/app/services/api-exchange.service';
import { TrendingCoinsResponse, TrendingCoinItem } from '../../interface/interface'; // Ajusta la ruta según tu estructura de carpetas

// Nuevas interfaces para los análisis
interface CryptoAnalytics {
  averagePrice: number;
  maxMarketCap: number;
  minMarketCap: number;
  rankDistribution: {[key: string]: number};
  priceComparison: {[key: string]: number};
}

@Component({
  selector: 'app-divisas',
  templateUrl: './divisas.component.html',
  styleUrls: ['./divisas.component.scss']
})
export class DivisasComponent implements OnInit {
  public trendingCoins: TrendingCoinsResponse | undefined;
  public searchTerm: string = '';
  public savedCoins: TrendingCoinItem[] = [];
  public isModalOpen: boolean = false;
  public analytics: CryptoAnalytics | undefined;

  constructor(private apiExchangeService: ApiExchangeService) {}

  ngOnInit(): void {
    this.apiExchangeService.getTrendingCoins().subscribe({
      next: (response: TrendingCoinsResponse) => {
        this.trendingCoins = response;
        this.calculateAnalytics();
      },
      error: (err) => {
        console.error('Error al obtener los datos', err);
      }
    });
    this.loadSavedCoins(); 
  }

  getTrendingCoins(): TrendingCoinItem[] {
    return this.trendingCoins?.coins
      .map(coin => coin.item)
      .filter(coin => coin.name.toLowerCase().includes(this.searchTerm.toLowerCase())) || [];
  }

  saveCoin(coin: TrendingCoinItem): void {
    const savedCoins = JSON.parse(localStorage.getItem('savedCoins') || '[]');

    const coinExists = savedCoins.find((savedCoin: TrendingCoinItem) => savedCoin.id === coin.id);

    if (!coinExists) {
      savedCoins.push(coin);
      localStorage.setItem('savedCoins', JSON.stringify(savedCoins));
      alert(`${coin.name} ha sido guardada!`);
    } else {
      alert(`${coin.name} ya está guardada!`);
    }
  }

  loadSavedCoins(): void {
    this.savedCoins = JSON.parse(localStorage.getItem('savedCoins') || '[]');
  }

  removeCoin(coinId: string): void {
    this.savedCoins = this.savedCoins.filter(coin => coin.id !== coinId);
    localStorage.setItem('savedCoins', JSON.stringify(this.savedCoins));
    alert(`La criptomoneda ha sido eliminada.`);
  }

  openModal(): void {
    this.loadSavedCoins();
    this.isModalOpen = true; 
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const header = document.getElementById('header');
    const links = document.querySelectorAll('#header nav a');
    if (header) {
      if (window.scrollY > 0) {
        header.classList.add('bg-white/80', 'ring-1', 'ring-white/10', 'shadow-lg', 'text-black', 'backdrop-blur-md');
        header.classList.remove('text-white', 'opacity-90');
        links.forEach(link => link.classList.add('hover:text-blue-400'));
      } else {
        header.classList.remove('bg-white/80', 'ring-1', 'ring-white/10', 'shadow-lg', 'text-black', 'backdrop-blur-md');
        header.classList.add('text-white', 'opacity-90');
      }
    }
  }

  calculateAnalytics(): void {
    if (!this.trendingCoins) return;

    const coins = this.getTrendingCoins();
    
    // Cálculo de precio promedio
    const averagePrice = coins.reduce((acc, coin) => 
      acc + (coin.data?.price || 0), 0) / coins.length;

    // Análisis de Market Cap
    const marketCaps = coins.map(coin => coin.market_cap_rank).filter(rank => rank !== undefined);
    const maxMarketCap = Math.min(...marketCaps); 
    const minMarketCap = Math.max(...marketCaps);

    // Distribución de rankings
    const rankDistribution = coins.reduce((acc, coin) => {
      if (coin.market_cap_rank) {
        const rankRange = Math.floor(coin.market_cap_rank / 10) * 10;
        const key = `${rankRange}-${rankRange + 9}`;
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {} as {[key: string]: number});

    // Comparación de precios
    const maxPrice = Math.max(...coins.map(coin => coin.data?.price || 0));
    const priceComparison = coins.reduce((acc, coin) => {
      if (coin.data?.price) {
        acc[coin.symbol] = (coin.data.price / maxPrice) * 100;
      }
      return acc;
    }, {} as {[key: string]: number});

    this.analytics = {
      averagePrice,
      maxMarketCap,
      minMarketCap,
      rankDistribution,
      priceComparison
    };
  }

  getBestRankedCoin(): TrendingCoinItem | undefined {
    const coins = this.getTrendingCoins();
    return coins.reduce((prev, current) => 
      (prev.market_cap_rank < current.market_cap_rank) ? prev : current
    );
  }

  getHighestPriceCoin(): TrendingCoinItem | undefined {
    const coins = this.getTrendingCoins();
    if (!coins.length) return undefined;
    
    return coins.reduce((prev, current) => {
      const prevPrice = prev.data?.price || 0;
      const currentPrice = current.data?.price || 0;
      return prevPrice > currentPrice ? prev : current;
    });
  }

  getCoinsInRange(range: string): TrendingCoinItem[] {
    const [start, end] = range.split('-').map(Number);
    return this.getTrendingCoins().filter(coin => 
      coin.market_cap_rank >= start && coin.market_cap_rank <= end
    );
  }

  getCoinBySymbol(symbol: string): TrendingCoinItem | undefined {
    return this.getTrendingCoins().find(coin => 
      coin.symbol.toLowerCase() === symbol.toLowerCase()
    );
  }
}
