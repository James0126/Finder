import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ASSET } from "../config/constants";

const config = { baseURL: ASSET };

export const useTerraAssets = <T>(path: string) =>
  useQuery<T, AxiosError>(["assets", path], async () => {
    const { data } = await axios.get<T>(path, config);
    return data;
  });
