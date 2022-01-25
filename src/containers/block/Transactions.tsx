import { useState } from "react";
import FinderLink from "../../components/FinderLink";
import { useTxsByHeight } from "../../queries/transaction";
import { combineState } from "../../queries/query";
import Txs from "../global/Txs";
import Fee from "../transaction/Fee";
import s from "./Transactions.module.scss";

const Transactions = ({ height }: { height: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const { data, ...state } = useTxsByHeight(height, pageOffset);
  const { isLoading } = combineState(state);
  const offset = data?.tx.byHeight.offset;
  const txInfos = data?.tx.byHeight.txInfos;

  const getTxRow = (txInfos: TxInfo[], value?: string) =>
    txInfos.map((tx) => {
      const { chainId, compactFee, compactMessage, txhash, raw_log } = tx;
      const { amounts } = compactFee;
      const { type } = compactMessage[0];
      const fee = <Fee coins={amounts} />;
      const hash = <FinderLink tx short children={txhash} />;
      const data = { chainId, hash, type, fee, raw_log };
      const classname = value
        ? raw_log.includes(value)
          ? undefined
          : s.hide
        : undefined;

      return { data, classname };
    });

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
      title: "Chain id",
      key: "chainId",
    },
    {
      title: "Fee",
      key: "fee",
    },
  ];

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
