export interface Bank {
  deposited: CoinSet;
  supply: CoinSet;
}

export interface CoinSet {
  amount?: number;
  twodollars: number;
  onedollar: number;
  fiftycents: number;
  twentycents: number;
  tencents: number;
}