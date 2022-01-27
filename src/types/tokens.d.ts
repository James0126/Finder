type CW20Tokens = Record<string, CW20TokenItem>;
type CW20TokenResponse = Record<string, CW20Tokens>;

interface CW20TokenInfoResponse {
  symbol: string;
  name?: string;
  decimals: number;
}

interface CW20TokenItem extends CW20TokenInfoResponse {
  token: TerraAddress;
  protocol?: string;
  icon?: string;
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
