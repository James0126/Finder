import axios from "axios";
import { useQuery } from "react-query";
import { ASSET_URL } from "../scripts/utility";

const config = { baseURL: ASSET_URL };

export const useTerraAssets = <T>(path: string) => {
  const { data } = useQuery(
    ["Assets", path],
    async () => await axios.get<T>(path, config)
  );

  return data;
};
