import { Component, OnInit, HostListener } from '@angular/core';
import { ApiExchangeService } from 'src/app/services/api-exchange.service';
import { TrendingCoinsResponse, TrendingCoinItem } from '../../interface/interface'; // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-divisas',
  templateUrl: './divisas.component.html',
  styleUrls: ['./divisas.component.scss']
})
export class DivisasComponent implements OnInit {

  public trendingCoins: TrendingCoinsResponse | undefined;
  public searchTerm: string = '';

  constructor(private apiExchangeService: ApiExchangeService) {}

  ngOnInit(): void {
    this.apiExchangeService.getTrendingCoins().subscribe({
      next: (response: TrendingCoinsResponse) => {
        this.trendingCoins = response;
      },
      error: (err) => {
        console.error('Error al obtener los datos', err);
      }
    });
  }

  getTrendingCoins(): TrendingCoinItem[] {
    return this.trendingCoins?.coins
      .map(coin => coin.item)
      .filter(coin => coin.name.toLowerCase().includes(this.searchTerm.toLowerCase())) || [];
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
}
