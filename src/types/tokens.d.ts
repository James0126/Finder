type CW20Tokens = Record<string, CW20TokenItem>;
type CW20TokenResponse = Record<string, CW20Tokens>;

interface CW20TokenInfoResponse {
  symbol: string;
  name: string;
  decimals: number;
}

interface CW20TokenItem {
  protocol: string;
  symbol: string;
  name: string;
  token: string;
  icon?: string;
  decimals?: number;
}

type IBCTokens = Record<string, IBCTokenItem>;
type IBCTokenResponse = Record<string, IBCTokens>;

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

/* coin | token */
type CoinDenom = string; // uluna | uusd
type IBCDenom = string; // ibc/...
type TokenAddress = TerraAddress;
type Denom = CoinDenom | IBCDenom;
type Token = Denom | TokenAddress;
