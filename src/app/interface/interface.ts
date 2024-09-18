export interface TrendingCoinItem {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: string;
  score: number;
  data: {
    price: number;
    market_cap: string;
    total_volume: string;
    price_change_percentage_24h: {
      [key: string]: number;
    };
  };
}

export interface TrendingCoinsResponse {
  coins: {
    item: TrendingCoinItem;
  }[];
}
