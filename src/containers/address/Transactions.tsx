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
      key: "hash",
      render: (hash: string) => <FinderLink tx short children={hash} />,
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
      render: (height: number) => <FinderLink block children={height} />,
    },
    {
      title: "Fee",
      key: "fee",
      render: (amounts: CoinData[]) => <Fee coins={amounts} />,
    },
  ];

  const dataSource = txInfos.map((data) => {
    const { chainId, compactFee, compactMessage, txhash, height } = data;
    const { amounts } = compactFee;
    const { type } = compactMessage[0];
    return {
      chainId: chainId,
      hash: txhash,
      type: type,
      height: height,
      fee: amounts,
    };
  });

  return (
    <section>
      <h2>Transactions</h2>
      <Table columns={columns} dataSource={dataSource} />
    </section>
  );
};

export default Transactions;
