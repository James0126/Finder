type CW20TokenResponse = Record<string, CW20Tokens>;
type CW20Tokens = Record<string, CW20TokenItem>;

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

type IBCTokenResponse = Record<string, IBCTokens>;
type IBCTokens = Record<string, IBCTokenItem>;

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
