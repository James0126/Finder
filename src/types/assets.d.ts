/* tokens */
interface CW20Token {
  protocol: string;
  symbol: string;
  token: string;
  icon?: string;
}

type CW20Tokens = Record<string, Record<string, CW20Token>>;

interface IBCToken {
  denom: string;
  path: string;
  base_denom: string;
  symbol: string;
  name: string;
  icon?: string;
}

type IBCTokens = Record<string, Record<string, IBCToken>>;

/* contracts */
type CW20Contracts = Record<string, Record<string, CW20Contract>>;

interface CW20Contract {
  protocol: string;
  name: string;
  icon: string;
}

type CW721Contracts = Record<string, Record<string, NFTContract>>;

interface CW721Contract {
  name: string;
  icon: string;
  contract: string;
}

interface ChainOption {
  name: string;
  chainID: string;
  lcd: string;
  mantle: string;
}
