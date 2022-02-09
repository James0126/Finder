type CW20Contracts = Record<string, Record<string, CW20Contract>>;

interface CW20Contract {
  protocol: string;
  name: string;
  icon: string;
}

type CW721Contracts = Record<string, Record<string, CW721Contract>>;

interface CW721ContractItem extends CW721ContractInfoResponse {
  contract: TerraAddress;
  protocol?: string;
  icon?: string;
  homepage?: string;
  marketplace?: string[];
}

/* cw721 */
interface CW721ContractInfoResponse {
  name: string;
  symbol: string;
  decimals: number;
}

type CW721Whitelist = Record<TerraAddress, CW721ContractItem>;

interface NFTTokenItem {
  token_uri?: string;
  extension?: Extension;
}

interface Extension {
  name?: string;
  description?: string;
  image?: string;
}
