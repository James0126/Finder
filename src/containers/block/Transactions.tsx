import FinderLink from "../../components/FinderLink";
import Table from "../../components/Table";
import { useTxsByHeight } from "../../queries/transaction";
import Fee from "../transaction/Fee";

const Transactions = ({ height }: { height: string }) => {
  const data = useTxsByHeight(height);

  if (!data) {
    return null;
  }

  const { txInfos } = data.tx.byHeight;

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
      title: "ChainID",
      key: "chainId",
    },
    {
      title: "Fee",
      key: "fee",
    },
  ];

  const dataSource = txInfos.map((data) => {
    const { chainId, compactFee, compactMessage, txhash } = data;
    const { amounts } = compactFee;
    const { type } = compactMessage[0];
    const renderType = type.slice(type.indexOf("/") + 1);
    const fee = <Fee coins={amounts} />;
    const hash = (
      <FinderLink tx short>
        {txhash}
      </FinderLink>
    );

    return { chainId: chainId, hash: hash, type: renderType, fee: fee };
  });

  return (
    <section>
      <h2>Transactions</h2>
      <Table columns={columns} dataSource={dataSource} />
    </section>
  );
};

export default Transactions;
