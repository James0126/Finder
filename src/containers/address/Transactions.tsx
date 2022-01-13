import FinderLink from "../../components/FinderLink";
import Table from "../../components/Table";
import { useTxsByAddress } from "../../queries/transaction";
import Fee from "../transaction/Fee";

const Transactions = ({ address }: { address: string }) => {
  const data = useTxsByAddress(address);

  if (!data) {
    return null;
  }

  const { txInfos } = data.tx.byAddress;

  const columns = [
    {
      title: "Hash",
      dataIndex: "hash",
      key: "hash",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "ChainID",
      dataIndex: "chainId",
      key: "chainId",
    },
    {
      title: "Fee",
      dataIndex: "fee",
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
