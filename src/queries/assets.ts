import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ASSET } from "../config/constants";
import { RefetchOptions } from "./query";

const config = { baseURL: ASSET };

export const useTerraAssets = <T>(path: string, disabled?: boolean) =>
  useQuery<T, AxiosError>(
    [path, "assets"],
    async () => {
      const { data } = await axios.get<T>(path, config);
      return data;
    },

    { ...RefetchOptions.INFINITY, enabled: !disabled }
  );

//TODO: Fix types
export const useCW20Whitelist = (disabled = false) => {
  return useTerraAssets<CW20TokenResponse>("cw20/tokens.json", disabled);
};

export const useCW721Whitelist = () => {
  return useTerraAssets<CW721ContractsResponse>("cw721/contracts.json");
};

/* contracts */
export const useCW20Contracts = () =>
  useTerraAssets<CW20ContractsResponse>("/cw20/contracts.json");

export const useIBCWhitelist = () =>
  useTerraAssets<IBCTokenResponse>("/ibc/tokens.json");
