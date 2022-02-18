import { useState } from "react";
import classnames from "classnames";
import { getTxAmounts } from "@terra-money/log-finder-ruleset";
import Flex from "../../components/Flex";
import FinderLink from "../../components/FinderLink";
import { useTxsByAddress } from "../../queries/transaction";
import { useAmountLogMatcher } from "../../store/LogfinderRuleSet";
import { fromISOTime } from "../../scripts/date";
import { totalAmounts } from "../../scripts/utility";
import TxHistory from "../Txs/TxHistory";
import Action from "../transaction/Action";
import Coins from "../transaction/Coins";
import Fee from "../transaction/Fee";
import s from "./Txs.module.scss";

type Msg = {
  msgType: string;
  msgNum: number;
};

type LogData = {
  log: TxLog[];
  msg: Message[];
};

type HashData = {
  txhash: string;
  timestamp: string;
};

interface Data {
  hashData: HashData;
  msgInfo: Msg;
  height: string;
  raw_log: string;
  action: LogData;
  amountOut: CoinData[];
  amountIn: CoinData[];
  fee: CoinData[];
}

const Txs = ({ address }: { address: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...state } = useTxsByAddress(address, pageOffset);

  const offset = data?.tx.byAddress.offset;
  const txInfos = data?.tx.byAddress.txInfos;

  const columns = [
    {
      title: "Block",
      key: "height",
      render: (height: string) => <FinderLink block children={height} />,
    },
    {
      title: "TxHash",
      key: "hashData",
      render: ({ txhash, timestamp }: HashData) => (
        <>
          <FinderLink tx short children={txhash} />
          <br />
          <span className={s.nowrap}>{fromISOTime(new Date(timestamp))}</span>
        </>
      ),
    },
    {
      title: "Type",
      key: "msgInfo",
      render: ({ msgType, msgNum }: Msg) => (
        <span className={s.nowrap}>
          <span className={s.type}>{msgType}</span>
          {msgNum ? (
            <span className={classnames(s.msgNum, s.type)}>+{msgNum}</span>
          ) : null}
        </span>
      ),
    },
    {
      title: "Description",
      key: "action",
      render: ({ log, msg }: LogData) => (
        <Action logs={log} msgs={msg} limit={1} />
      ),
    },
    {
      title: <Flex end>Fee</Flex>,
      key: "fee",
      render: (fee: CoinData[]) => (
        <Fee coins={fee} className={classnames(s.nowrap, s.fee)} />
      ),
    },
    {
      title: <Flex end>Amount (Out)</Flex>,
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
      title: <Flex end>Amount (In)</Flex>,
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
  ];

  const logMatcher = useAmountLogMatcher();

  const getTxRow = (tx: TxInfo): Data => {
    const {
      txhash,
      compactMessage,
      height,
      logs,
      raw_log,
      code,
      timestamp,
      compactFee,
    } = tx;
    const { type } = compactMessage[0];
    const hashData = { txhash, timestamp };
    const msgType = type.slice(type.indexOf("/") + 1);
    const msgInfo = { msgType, msgNum: compactMessage.length - 1 };
    const matched = getTxAmounts(logs, compactMessage, logMatcher, address);
    const [amountIn, amountOut] = totalAmounts(address, matched);
    const { amounts: fee } = compactFee;
    const action = {
      log: logs,
      msg: code ? [compactMessage[0]] : compactMessage,
    };

    return {
      hashData,
      msgInfo,
      height,
      raw_log,
      action,
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
