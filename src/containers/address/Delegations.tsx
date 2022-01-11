import { readAmount, readDenom } from "@terra.kitchen/utils";
import {
  getFindMoniker,
  useDelegations,
  useValidators,
} from "../../queries/validator";
import Card from "../../components/Card";

const Delegations = ({ address }: { address: string }) => {
  const { data: delegation } = useDelegations(address);
  const { data: validators } = useValidators();

  if (!delegation || !validators) {
    return null;
  }

  const [delegations] = delegation;

  return delegations.length ? (
    <Card title={"Delegations"}>
      {/* TODO: Table */}
      {delegations.map((data, key) => {
        const { validator_address, balance } = data;
        const moniker = getFindMoniker(validators)(validator_address);
        const amount = readAmount(balance.amount.toString(), { comma: true });
        const denom = readDenom(balance.denom);

        return <div key={key}>{`${moniker} ${amount} ${denom}`}</div>;
      })}
    </Card>
  ) : null;
};

export default Delegations;
