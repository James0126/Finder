/* ibc */
type IBCWhitelist = Record<string, Record<string, IBCTokenItem>>;

interface IBCTokenInfoResponse {
  path: string;
  base_denom: string;
}

interface IBCTokenItem extends IBCTokenInfoResponse {
  denom: string;
  symbol: string;
  name: string;
  icon: string;
}

/* native */
interface CoinData {
  amount: Amount;
  denom: Denom;
}
