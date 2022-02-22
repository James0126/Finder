import { gql } from "@apollo/client";
import { UseQueryResult } from "react-query";
import { useGraphQL } from "./graphql";

//TODO: Refactor codes
const queryTxsByAddress = (address: string, offset?: string) => {
  const offsetField = offset ? `offset:"${offset}"` : "";
  return gql`
    query {
        tx {
            byAddress(address:"${address}" ${offsetField}) {
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
                timestamp
                code
              }
            }
        }
    }
`;
};

const queryTxsByHeight = (height: string, chainId: string, offset?: string) => {
  const offsetField = offset ? `offset:"${offset}"` : "";
  return gql`
    query {
        tx {
            byHeight(height: ${height}, chainId: "${chainId}", ${offsetField}) {
                header {
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
                  code
                }
            }
        }
    }
  `;
};

const queryTxByHash = (hash: string) => gql`
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
              height
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

export const useTxsByHeight = (
  height: string,
  offset?: string
): UseQueryResult<TxsByHeight> => {
  const chainID = Number(height) > 1378000 ? "columbus-5" : "columbus-4";
  const queryMsg = queryTxsByHeight(height, chainID, offset);
  return useGraphQL(queryMsg, height);
};

export const useTxByHash = (hash: string): UseQueryResult<TxByHash> => {
  const queryMsg = queryTxByHash(hash);
  return useGraphQL(queryMsg);
};
