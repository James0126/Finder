interface Whitelist {
  protocol: string;
  symbol: string;
  token: string;
  icon?: string;
}

type CW20Whitelist = Record<string, Record<string, Contracts>>;

interface Contracts {
  protocol: string;
  name: string;
  icon: string;
}

type NFTWhitelist = Record<string, Record<string, NFTContracts>>;

interface NFTContracts {
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
