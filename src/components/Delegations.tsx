import {
  getFindMoniker,
  useDelegations,
  useValidators,
} from "../queries/validator";
import format from "../scripts/format";
import Card from "./Card";

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
        const { validator_address } = data;
        const moniker = getFindMoniker(validators)(validator_address);
        const { denom, amount } = data.balance;

        return (
          <div key={key}>
            {`${moniker} ${format.amount(amount.toString())} ${format.denom(
              denom
            )}`}
          </div>
        );
      })}
    </Card>
  ) : null;
};

export default Delegations;
