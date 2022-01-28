import { isDenomIBC } from "@terra.kitchen/utils";
import { useBankBalance } from "../../queries/bank";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import AddTokens from "../custom/AddTokens";
import ManageCustomTokens from "../custom/ManageCustomTokens";
import NativeBalance from "./NativeBalance";

const Balance = ({ address }: { address: string }) => {
  const { data: balance } = useBankBalance(address);
  const native = balance?.filter((coin) => !isDenomIBC(coin.denom)).toArray();

  return (
    <section>
      <Card title={"Coins"}>
        <NativeBalance coins={native} />
      </Card>

      <Card title={"Tokens"}>
        <Modal modalContent={<ManageCustomTokens />} buttonLabel="Add" />
        <AddTokens address={address} />
      </Card>
    </section>
  );
};

export default Balance;
