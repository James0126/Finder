import FinderLink from "../../components/FinderLink";
import { useTxsByAddress } from "../../queries/graphql";
import Fee from "../transaction/Fee";

const Transactions = ({ address }: { address: string }) => {
  const data = useTxsByAddress(address);

  if (!data) {
    return null;
  }

  const { txInfos } = data.tx.byAddress;
  const header = ["hash", "type", "chainId", "fee"];

  return (
    <section>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            {header.map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {txInfos.map((tx, key) => {
            const { chainId, compactFee, compactMessage, txhash } = tx;
            const { amounts } = compactFee;
            const { type } = compactMessage[0];
            const renderType = type.slice(type.indexOf("/") + 1);

            const hash = (
              <FinderLink tx short>
                {txhash}
              </FinderLink>
            );

            return (
              <tr key={key}>
                <td>{hash}</td>
                <td>{renderType}</td>
                <td>{chainId}</td>
                <td>
                  <Fee coins={amounts} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Transactions;
