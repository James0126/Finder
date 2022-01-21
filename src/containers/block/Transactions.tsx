import { useState } from "react";
import FinderLink from "../../components/FinderLink";
import Table from "../../components/Table";
import Fee from "../transaction/Fee";
import s from "./Transactions.module.scss";

const Transactions = ({ txs }: { txs: TxInfo[] }) => {
  const [value, setValue] = useState("");

  const columns = [
    {
      title: "Hash",
      key: "hash",
    },
    {
      title: "Type",
      key: "type",
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

  const dataSource = txs.map((tx) => {
    const { chainId, compactFee, compactMessage, txhash, raw_log } = tx;
    const { amounts } = compactFee;
    const { type } = compactMessage[0];
    const renderType = type.slice(type.indexOf("/") + 1);
    const fee = <Fee coins={amounts} />;
    const hash = (
      <FinderLink tx short>
        {txhash}
      </FinderLink>
    );

    const data = { chainId, hash, type: renderType, fee };
    const classname = raw_log.includes(value) || !value ? undefined : s.hide;

    return { data, classname };
  });

  return (
    <section>
      <h2>Transactions</h2>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
      />
      {txs.length ? (
        <Table columns={columns} dataSource={dataSource} />
      ) : (
        "No more transaction"
      )}
    </section>
  );
};

export default Transactions;
