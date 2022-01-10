import {
  getFindMoniker,
  useUndelegations,
  useValidators,
} from "../queries/validator";
import format from "../scripts/format";
import Card from "../components/Card";

const Undelegations = ({ address }: { address: string }) => {
  const { data: validators } = useValidators();
  const { data } = useUndelegations(address);

  if (!data || !validators) {
    return null;
  }

  return data.length ? (
    <Card title={"Undelegations"}>
      {/* TODO: Table */}
      {data.map((validator, key) => {
        const { entries, validator_address } = validator;
        const [entry] = entries;
        const amount = entry.balance.toString();
        const moniker = getFindMoniker(validators)(validator_address);

        return (
          <div key={key}>{`${moniker} ${format.amount(amount)} Luna`}</div>
        );
      })}
    </Card>
  ) : null;
};

export default Undelegations;
