import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ASSET } from "../config/constants";
import { useNetworkName } from "../contexts/ChainsContext";
import { RefetchOptions } from "./queries";

const config = { baseURL: ASSET };

export const useTerraAssets = <T>(path: string) =>
  useQuery<T, AxiosError>(
    ["assets", path],
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

export const useCW721Contracts = () => {
  const network = useNetworkName();
  const { data } = useTerraAssets<CW721Contracts>("/cw721/contracts.json");
  return data?.[network];
};

/* tokens */
export const useCW20Tokens = () => {
  const network = useNetworkName();
  const { data } = useTerraAssets<CW20Tokens>("/cw20/tokens.json");
  return data?.[network];
};

export const useIBCTokens = () => {
  const network = useNetworkName();
  const { data } = useTerraAssets<IBCTokens>("/ibc/tokens.json");
  return data?.[network];
};
