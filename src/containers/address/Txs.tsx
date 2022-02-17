import { useState } from "react";
import classnames from "classnames";
import { getTxAmounts } from "@terra-money/log-finder-ruleset";
import { Coin } from "@terra-money/terra.js";
import FinderLink from "../../components/FinderLink";
import { useTxsByAddress } from "../../queries/transaction";
import { useAmountLogMatcher } from "../../store/LogfinderRuleSet";
import { totalAmounts } from "../../scripts/utility";
import TxsComponent from "../Txs/TxsComponent";
import Action from "../transaction/Action";
import s from "./Txs.module.scss";
import Coins from "../transaction/Coins";
import { fromISOTime } from "../../scripts/date";

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
  amountOut: Coin[];
  amountIn: Coin[];
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
          <span className={s.time}>{fromISOTime(new Date(timestamp))}</span>
        </>
      ),
    },
    {
      title: "Type",
      key: "msgInfo",
      render: ({ msgType, msgNum }: Msg) => (
        <span className={s.typeWrapper}>
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
        <Action logs={log} msgs={msg} showNum={1} />
      ),
    },
    {
      title: "Amount (Out)",
      key: "amountOut",
      render: (coins: Coin[]) => (
        <Coins coins={coins} sign="-" className={s.out} />
      ),
    },
    {
      title: "Amount (In)",
      key: "amountIn",
      render: (coins: Coin[]) => (
        <Coins coins={coins} sign="+" className={s.in} />
      ),
    },
  ];

  const logMatcher = useAmountLogMatcher();

  const getTxRow = (tx: TxInfo): Data => {
    const { txhash, compactMessage, height, logs, raw_log, code, timestamp } =
      tx;
    const { type } = compactMessage[0];
    const hashData = { txhash, timestamp };
    const msgType = type.slice(type.indexOf("/") + 1);
    const msgInfo = { msgType, msgNum: compactMessage.length - 1 };
    const matched = getTxAmounts(logs, compactMessage, logMatcher, address);
    const [amountIn, amountOut] = totalAmounts(address, matched);
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
      amountIn,
      amountOut,
    };
  };

  return (
    <TxsComponent
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
