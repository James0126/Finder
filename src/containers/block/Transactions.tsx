import FinderLink from "../../components/FinderLink";
import Table from "../../components/Table";
import Action from "../transaction/Action";
import Fee from "../transaction/Fee";

const Transactions = ({ txs }: { txs: TxInfo[] }) => {
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
      title: "Action",
      key: "action",
    },
    {
      title: "Fee",
      key: "fee",
    },
  ];

  const dataSource = txs.map((tx) => {
    const { chainId, compactFee, compactMessage, txhash, logs } = tx;
    const { amounts } = compactFee;
    const { type } = compactMessage[0];
    const renderType = type.slice(type.indexOf("/") + 1);
    const action = <Action logs={logs} msgs={compactMessage} />;
    const fee = <Fee coins={amounts} />;
    const hash = (
      <FinderLink tx short>
        {txhash}
      </FinderLink>
    );

    return { chainId, hash, type: renderType, action, fee };
  });

  return (
    <section>
      <h2>Transactions</h2>
      {txs.length ? (
        <Table columns={columns} dataSource={dataSource} />
      ) : (
        "No more transaction"
      )}
    </section>
  );
};

export default Transactions;
