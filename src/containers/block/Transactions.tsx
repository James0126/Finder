import { useEffect, useState } from "react";
import Table from "../../components/Table";
import FinderLink from "../../components/FinderLink";
import Pagenation from "../../components/Pagination";
import Fee from "../transaction/Fee";
import s from "./Transactions.module.scss";
import { useTxsByHeight } from "../../queries/transaction";

const Transactions = ({ height }: { height: string }) => {
  const [pageOffset, setOffset] = useState<string>();
  const [value, setValue] = useState("");
  const [txs, setTxs] = useState<TxInfo[]>([]);
  const { data } = useTxsByHeight(height, pageOffset);

  const txInfos = data?.tx.byHeight.txInfos;
  const offset = data?.tx.byHeight.offset;

  useEffect(() => {
    if (txInfos && !txs.length) {
      setTxs(txInfos);
      setOffset(offset);
    }
  }, [txInfos, txs, offset]);

  const pagenation = () => {
    setOffset(offset);
    if (txInfos) {
      setTxs([...txs, ...txInfos]);
    }
  };
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
      />
      {dataSource.length ? (
        <Pagenation action={pagenation} offset={offset}>
          <Table columns={columns} dataSource={dataSource} />
        </Pagenation>
      ) : (
        "No more transaction"
      )}
    </section>
  );
};

export default Transactions;
