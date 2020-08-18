export interface Bank {
  deposited: CoinSet;
  supply: CoinSet;
  returned: CoinSet;
  transactionValid: boolean;
  outOfStock: boolean;
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
