import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ASSET } from "../config/constants";
import { useNetworkName } from "../contexts/ChainsContext";
import { RefetchOptions } from "./query";

const config = { baseURL: ASSET };

export const useTerraAssets = <T>(path: string) =>
  useQuery<T, AxiosError>(
    [path, "assets"],
    async () => {
      const { data } = await axios.get<T>(path, config);
      return data;
    },
    { ...RefetchOptions.INFINITY }
  );

/* contracts */
export const useCW20Contracts = () => {
  const network = useNetworkName();
  const { data } = useTerraAssets<CW20Contracts>("/cw20/contracts.json");
  return data?.[network];
};

export const useCW20ContractInfo = (address: string) => {
  const data = useCW20Contracts();
  return data?.[address];
};

export const useCW721Contracts = () => {
  const network = useNetworkName();
  const { data } = useTerraAssets<CW721Contracts>("/cw721/contracts.json");
  return data?.[network];
};

export const useCW721ContractInfo = (address: string) => {
  const data = useCW721Contracts();
  return data?.[address];
};

/* tokens */
export const useCW20Tokens = () => {
  const network = useNetworkName();
  const { data } = useTerraAssets<CW20TokenResponse>("/cw20/tokens.json");
  return data?.[network];
};

export const useCW20TokenInfo = (address: string) => {
  const data = useCW20Tokens();
  return data?.[address];
};

export const useIBCTokens = () => {
  const network = useNetworkName();
  const { data } = useTerraAssets<IBCTokenResponse>("/ibc/tokens.json");
  //if (!data) throw new Error(`ibc whitelist is not defined`);
  return data?.[network];
};

export const useIBCTokenInfo = (hash: string) => {
  const data = useIBCTokens();
  //if (!data) throw new Error(`${hash} is not defined`);
  return data?.[hash];
};
