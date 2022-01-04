import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ASSET_URL } from "../scripts/utility";

const config = { baseURL: ASSET_URL };

export const useTerraAssets = <T>(path: string) =>
  useQuery<T, AxiosError>(["assets", path], async () => {
    const { data } = await axios.get<T>(path, config);
    return data;
  });
