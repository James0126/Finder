import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ASSET } from "../config/constants";
import { useCurrentChain } from "../contexts/chainsContext";

const config = { baseURL: ASSET };

export const useTerraAssets = <T>(path: string) =>
  useQuery<T, AxiosError>(["assets", path], async () => {
    const { data } = await axios.get<T>(path, config);
    return data;
  });

export const useCW20Contracts = () => {
  const { name } = useCurrentChain();
  const { data } = useTerraAssets<CW20Whitelist>("/cw20/contracts.json");
  return data?.[name];
};

export const useNFTContracts = () => {
  const { name } = useCurrentChain();
  const { data } = useTerraAssets<NFTWhitelist>("/cw721/contracts.json");
  return data?.[name];
};
