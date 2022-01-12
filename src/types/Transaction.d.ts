interface TxsByAddress {
  tx: {
    byAddress: {
      txInfos: TxInfos[];
      offset: string;
    };
  };
}

interface CoinData {
  amount: number;
  denom: string;
}

interface TxInfos {
  chainId: string;
  compactFee: {
    amounts: CoinData[];
  };
  compactMessage: Message[];
  txhash: string;
}

interface Message {
  coins: CoinData[];
  contract: string;
  execute_msg: executeMsg;
  sender: string;
  type: string;
}

interface executeMsg {
  send: {
    amount: string;
    contract: string;
    msg: string;
  };
}
