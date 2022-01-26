import { isDenomIBC } from "@terra.kitchen/utils";
import { useBankBalance } from "../../queries/bank";
import Card from "../../components/Card";
import IBCAmount from "../token/IBCAmount";
import NativeBalance from "./NativeBalance";
import ManageCustomTokens from "../custom/ManageCustomTokens";
import Modal from "../../components/Modal";
import AddedTokens from "../custom/AddedTokens";

const Balance = ({ address }: { address: string }) => {
  const { data: balance } = useBankBalance(address);
  const native = balance?.filter((coin) => !isDenomIBC(coin.denom)).toArray();
  const ibc = balance?.filter((coin) => isDenomIBC(coin.denom)).toArray();

  return (
    <section>
      <Card title={"Coins"}>
        {native?.length ? (
          <NativeBalance coins={native} />
        ) : (
          "This account doesn't hold any coins yet."
        )}
      </Card>

      <Card title={"Tokens"}>
        <Modal modalContent={<ManageCustomTokens />} buttonLabel="Add" />
        <AddedTokens address={address} />
        {/* TODO: Add tokens
        {ibc?.map((token, key) => (
          <IBCAmount token={token} key={key} />
        ))} */}
      </Card>
    </section>
  );
};

export default Balance;
