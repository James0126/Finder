import { useState } from "react";
import { Coin } from "@terra-money/terra.js";
import { getTxAmounts } from "@terra-money/log-finder-ruleset";
import FinderLink from "../../components/FinderLink";
import { useTxsByAddress } from "../../queries/transaction";
import { combineState } from "../../queries/query";
import { totalAmounts } from "../../scripts/utility";
import { useAmountLogMatcher } from "../../store/LogfinderRuleSet";
import Txs from "../global/Txs";
import Fee from "../transaction/Fee";
import CoinComponent from "../token/Coin";
import s from "./Transactions.module.scss";

//TODO: Refactor
const Transactions = ({ address }: { address: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...status } = useTxsByAddress(address, pageOffset);
  const logMatcher = useAmountLogMatcher();
  const { isLoading } = combineState(status);
  const offset = data?.tx.byAddress.offset;
  const txInfos = data?.tx.byAddress.txInfos;

  const columns = [
    {
      title: "Hash",
      key: "hash",
    },
    {
      title: "Type",
      key: "type",
      render: (type: string) => type.slice(type.indexOf("/") + 1),
    },
    {
      title: "ChainID",
      key: "chainId",
    },
    {
      title: "Height",
      key: "height",
    },
    {
      title: "Amount In",
      key: "amountIn",
    },
    {
      title: "Amount Out",
      key: "amountOut",
    },
    {
      title: "Fee",
      key: "fee",
    },
  ];

  const getTxRow = (txInfos: TxInfo[], keyword?: string) =>
    txInfos.map((tx) => {
      const { compactFee, compactMessage, logs, height, txhash, raw_log } = tx;
      const { amounts } = compactFee;
      const { type } = compactMessage[0];
      const matchedLogs = getTxAmounts(
        logs,
        compactMessage,
        logMatcher,
        address
      );
      const [amountIn, amountOut] = totalAmounts(address, matchedLogs);
      const classname = keyword
        ? raw_log.includes(keyword)
          ? undefined
          : s.hide
        : undefined;

      const data = {
        ...tx,
        type,
        fee: <Fee coins={amounts} />,
        amountIn: renderCoins(amountIn),
        amountOut: renderCoins(amountOut),
        height: <FinderLink block children={height} />,
        hash: <FinderLink tx short children={txhash} />,
      };
      return { data, classname };
    });

  return (
    <section>
      <h2>Transactions</h2>
      <Txs
        txInfos={txInfos}
        getTxRow={getTxRow}
        pagination={() => setOffset(offset)}
        offset={offset}
        columns={columns}
        loading={isLoading}
      />
    </section>
  );
};

export default Transactions;

//TODO: Refactor codes
const renderCoins = (coins: Coin[]) => (
  <>
    {coins?.map((coin, key) => (
      <CoinComponent coin={coin} key={key} />
    ))}
  </>
);
