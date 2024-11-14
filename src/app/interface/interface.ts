export interface TrendingCoinItem {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  large: string;
  thumb: string;
  data: {
    price: number;
  };
}

export interface TrendingCoinsResponse {
  coins: {
    item: TrendingCoinItem;
  }[];
}
