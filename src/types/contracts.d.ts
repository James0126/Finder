type CW20ContractsResponse = Record<string, CW20Contracts>;
type CW20Contracts = Record<string, CW20Contract>;

interface CW20Contract {
  protocol: string;
  name: string;
  icon: string;
}

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

type CW721ContractsResponse = Record<string, CW721Whitelist>;
type CW721Contracts = Record<string, CW721ContractItem>;

interface NFTTokenItem {
  token_uri?: string;
  extension?: Extension;
}

interface Extension {
  name?: string;
  description?: string;
  image?: string;
}
