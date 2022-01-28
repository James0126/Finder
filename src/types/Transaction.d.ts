interface TxsByAddress {
  tx: {
    byAddress: {
      txInfos: TxInfo[];
      offset: string;
    };
  };
}

interface TxsByHeight {
  tx: {
    byHeight: {
      header: BlockInfo;
      txInfos: TxInfo[];
      offset: string;
    };
  };
}

interface TxByHash {
  tx: {
    byHash: TxInfo;
  };
}

interface CoinData {
  amount: number;
  denom: string;
}

interface BlockInfo {
  proposer_address: string;
  chain_id: string;
  time: string;
}

interface TxInfo {
  chainId: string;
  code: number;
  compactFee: {
    amounts: CoinData[];
  };
  compactMessage: Message[];
  timestamp: string;
  raw_log: string;
  logs: TxLog[];
  height: string;
  txhash: string;
}

interface TxLog {
  events: EventLog[];
  log: string;
  msg_index: number;
}

interface EventLog {
  attributes: Attributes[];
  type: string;
}

interface Attributes {
  key: string;
  value: string;
}

interface Message {
  type: string;
  message: any;
}

interface ExecuteMsg {
  send: {
    amount: string;
    contract: string;
    msg: string;
  };
}
