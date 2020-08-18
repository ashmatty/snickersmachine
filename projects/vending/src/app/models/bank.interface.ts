export interface Bank {
  deposited: CoinSet;
  supply: CoinSet;
  returned: CoinSet;
}

export interface CoinSet {
  amount?: number;
  twodollars: number;
  onedollar: number;
  fiftycents: number;
  twentycents: number;
  tencents: number;
  fivecents?: number;
}
