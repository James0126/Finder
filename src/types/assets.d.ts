interface Whitelist {
  protocol: string;
  symbol: string;
  token: string;
  icon?: string;
}

type CW20Whitelist = Record<string, Record<string, CW20Contracts>>;

interface CW20Contracts {
  protocol: string;
  name: string;
  icon: string;
}

type CW721Whitelist = Record<string, Record<string, NFTContracts>>;

interface CW721Contracts {
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
