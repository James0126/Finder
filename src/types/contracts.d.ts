type CW20Contracts = Record<string, Record<string, CW20Contract>>;

interface CW20Contract {
  protocol: string;
  name: string;
  icon: string;
}

type CW721Contracts = Record<string, Record<string, CW721Contract>>;

interface CW721Contract {
  contract: string;
  name: string;
  symbol: string;
  icon: string;
  homepage: string;
  marketplace: string[];
}

/* cw721 */
interface CW721ContractInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
}
