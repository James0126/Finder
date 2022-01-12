import { readAmount, readDenom } from "@terra.kitchen/utils";
import Amount from "../../components/Amount";
import FinderLink from "../../components/FinderLink";
import { useNetworkName } from "../../contexts/ChainsContext";
import { useTxsByAddress } from "../../queries/graphql";

const Transactions = ({ address }: { address: string }) => {
  const data = useTxsByAddress(address);
  const network = useNetworkName();
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
            const type = compactMessage[0].type;
            const renderType = type.slice(type.indexOf("/") + 1);

            const hash = (
              <FinderLink network={network} tx short>
                {txhash}
              </FinderLink>
            );

            return (
              <tr key={key}>
                <td>{hash}</td>
                <td>{renderType}</td>
                <td>{chainId}</td>
                <td>
                  {compactFee.amounts.map((data, key) => {
                    const amount = readAmount(data.amount);
                    const denom = readDenom(data.denom);
                    return <Amount amount={amount} denom={denom} key={key} />;
                  })}
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
