import {
  getFindMoniker,
  useDelegations,
  useValidators,
} from "../queries/validator";
import format from "../scripts/format";
import Card from "../components/Card";

const Delegations = ({ address }: { address: string }) => {
  const { data } = useDelegations(address);
  const { data: validators } = useValidators();

  if (!data || !validators) {
    return null;
  }

  const [delegations] = data;

  return delegations.length ? (
    <Card title={"Delegations"}>
      {/* TODO: Table */}
      {delegations?.map((data, key) => {
        const { validator_address, balance } = data;
        const moniker = getFindMoniker(validators)(validator_address);
        const amount = format.amount(balance.amount.toString());
        const denom = format.denom(balance.denom);

        return <div key={key}>{`${moniker} ${amount} ${denom}`}</div>;
      })}
    </Card>
  ) : null;
};

export default Delegations;
