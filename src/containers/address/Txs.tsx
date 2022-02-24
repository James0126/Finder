import { useState } from "react";
import classnames from "classnames";
import { getTxAmounts } from "@terra-money/log-finder-ruleset";
import Flex from "../../components/Flex";
import { useTxsByAddress } from "../../queries/transaction";
import { useAmountLogMatcher } from "../../store/LogfinderRuleSet";
import { totalAmounts } from "../../scripts/utility";
import Action from "../transaction/Action";
import Coins from "../transaction/Coins";
import Fee from "../transaction/Fee";
import TxHistory from "../history/TxHistory";
import TxBlock from "../history/table/TxBlock";
import TxTypes from "../history/table/TxTypes";
import TxHash from "../history/table/TxHash";
import s from "./Txs.module.scss";

type LogData = {
  logs: TxLog[];
  msgs: Message[];
};

type HashData = {
  txhash: string;
  code?: number;
};

type BlockData = {
  timestamp: string;
  height: string;
};

interface Data {
  hashData: HashData;
  parsed_message: Message[];
  blockData: BlockData;
  raw_log: string;
  logData: LogData;
  amountOut: CoinData[];
  amountIn: CoinData[];
  fee: CoinData[];
}

const Txs = ({ address }: { address: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...state } = useTxsByAddress(address, pageOffset);

  const offset = data?.tx.by_address.offset;
  const txInfos = data?.tx.by_address.tx_infos;

  const columns = [
    {
      title: "Block",
      key: "blockData",
      render: (data: BlockData) => <TxBlock {...data} className={s.nowrap} />,
    },
    {
      title: "TxHash",
      key: "hashData",
      render: (data: HashData) => <TxHash {...data} />,
    },
    {
      title: "Type",
      key: "parsed_message",
      render: (messages: Message[]) => <TxTypes messages={messages} />,
    },
    {
      title: "Description",
      key: "logData",
      render: (data: LogData) => <Action {...data} limit={1} />,
    },
    {
      title: (
        <Flex end className={s.nowrap}>
          Amount (Out)
        </Flex>
      ),
      key: "amountOut",
      render: (coins: CoinData[]) => (
        <Coins
          sign="-"
          limit={2}
          coins={coins}
          className={classnames(s.out, s.amount, s.nowrap)}
        />
      ),
    },
    {
      title: (
        <Flex end className={s.nowrap}>
          Amount (In)
        </Flex>
      ),
      key: "amountIn",
      render: (coins: CoinData[]) => (
        <Coins
          sign="+"
          limit={2}
          coins={coins}
          className={classnames(s.in, s.amount, s.nowrap)}
        />
      ),
    },
    {
      title: <Flex end>Fee</Flex>,
      key: "fee",
      render: (fee: CoinData[]) => (
        <Fee coins={fee} className={classnames(s.nowrap, s.fee)} />
      ),
    },
  ];

  const logMatcher = useAmountLogMatcher();

  const getTxRow = (tx: TxInfo): Data => {
    const {
      txhash,
      parsed_message,
      height,
      logs,
      raw_log,
      code,
      timestamp,
      parsed_fee,
    } = tx;
    const hashData = { txhash, code };
    const matched = getTxAmounts(logs, parsed_message, logMatcher, address);
    const [amountIn, amountOut] = totalAmounts(address, matched);
    const { amounts: fee } = parsed_fee;
    const blockData = { height, timestamp };

    //TODO: Fix message
    const msgs = code ? [parsed_message[0]] : parsed_message;
    const logData = { logs, msgs };

    return {
      hashData,
      parsed_message,
      blockData,
      raw_log,
      logData,
      fee,
      amountIn,
      amountOut,
    };
  };

  return (
    <TxHistory
      columns={columns}
      getTxRow={getTxRow}
      pagination={() => setOffset(offset)}
      dataSource={txInfos}
      offset={offset}
      state={state}
    />
  );
};
export default Txs;
