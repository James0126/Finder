type CW20Tokens = Record<string, Record<string, CW20Token>>;

interface CW20Token {
  protocol: string;
  symbol: string;
  token: string;
  icon?: string;
}

type IBCTokens = Record<string, Record<string, IBCToken>>;

interface IBCToken {
  denom: string;
  path: string;
  base_denom: string;
  symbol: string;
  name: string;
  icon: string;
}
