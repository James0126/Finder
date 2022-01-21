import { UseQueryResult } from "react-query";
import { useCurrentChain } from "../contexts/ChainsContext";
import { useGraphQL } from "./graphql";

//TODO: Refactor codes
const queryTxsByAddress = (address: string, offset?: string) => `
    query {
        tx {
            byAddress(address:"${address}", offset:"${offset}") {
              offset
              txInfos {
                chainId
                compactMessage {
                  type
                  message
                }
                compactFee {
                  amounts {
                    denom
                    amount
                  }
                }
                logs {
                  events {
                   attributes {
                     key
                     value
                   }
                   type
                 }
                 log
               }
                txhash
                height
                raw_log
              }
            }
        }
    }
`;

const queryTxsByHeight = (height: string, chainId: string) => `
    query {
        tx {
            byHeight(height:${height}, chainId:"${chainId}") {
              header{
                proposer_address
                chain_id
                time
              }
              offset
              txInfos {
                chainId
                compactMessage {
                  type
                  message
                }
                compactFee {
                  amounts {
                    denom
                    amount
                  }
                }
                logs {
                  events {
                   attributes {
                     key
                     value
                   }
                   type
                 }
                }
                txhash
                height
                raw_log
              }
            }
        }
    }
`;

const queryTxByHash = (hash: string, chainId: string) => `
    query {
        tx {
            byHash(chainId:"${chainId}", txHash:"${hash}") {
                chainId
                code
                compactMessage {
                  type
                  message
                }
                compactFee {
                  amounts {
                    denom
                    amount
                  }
                }
                txhash
                logs {
                 events {
                  attributes {
                    key
                    value
                  }
                  type
                }
                log
              }
              timestamp
              raw_log
            }
        }
    }
`;

export const useTxsByAddress = (
  address: string,
  offset?: string
): UseQueryResult<TxsByAddress> => {
  const queryMsg = queryTxsByAddress(address, offset);
  return useGraphQL(queryMsg);
};

export const useTxsByHeight = (height: string): UseQueryResult<TxsByHeight> => {
  const { chainID } = useCurrentChain();
  const queryMsg = queryTxsByHeight(height, chainID);
  return useGraphQL(queryMsg);
};

export const useTxByHash = (hash: string): UseQueryResult<TxByHash> => {
  const { chainID } = useCurrentChain();
  const queryMsg = queryTxByHash(hash, chainID);
  return useGraphQL(queryMsg);
};
