import { useCurrentChain } from "../contexts/ChainsContext";
import { useGraphQL } from "./graphql";

//TODO: Refactor codes
const queryTxsByAddress = (address: string) => `
    query {
        tx {
            byAddress(address: "${address}") {
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
              }
            }
        }
    }
`;

const queryTxsByHeight = (height: string, chainId: string) => `
    query {
        tx {
            byHeight(height: ${height}, chainId:"${chainId}") {
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
                txhash
                height
              }
            }
        }
    }
`;

const queryTxByHash = (hash: string) => `
    query {
        tx {
            byHash(txHash:"${hash}") {
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

export const useTxsByAddress = (address: string): TxsByAddress => {
  const queryMsg = queryTxsByAddress(address);
  return useGraphQL(queryMsg);
};

export const useTxsByHeight = (height: string): TxsByHeight => {
  const { chainID } = useCurrentChain();
  const queryMsg = queryTxsByHeight(height, chainID);
  return useGraphQL(queryMsg);
};

export const useTxByHash = (hash: string): TxByHash => {
  const queryMsg = queryTxByHash(hash);
  return useGraphQL(queryMsg);
};
