import { readAmount } from "@terra.kitchen/utils";
import {
  getFindMoniker,
  useUndelegations,
  useValidators,
} from "../../queries/validator";
import Card from "../../components/Card";

const Undelegations = ({ address }: { address: string }) => {
  const { data: validators } = useValidators();
  const { data: undelegations } = useUndelegations(address);

  if (!undelegations || !validators) {
    return null;
  }

  return undelegations.length ? (
    <Card title={"Undelegations"}>
      {/* TODO: Table */}
      {undelegations.map((validator, key) => {
        const { entries, validator_address } = validator;
        const [entry] = entries;
        const amount = entry.balance.toString();
        const moniker = getFindMoniker(validators)(validator_address);

        return (
          <div key={key}>{`${moniker} ${readAmount(amount, {
            comma: true,
          })} Luna`}</div>
        );
      })}
    </Card>
  ) : null;
};

export default Undelegations;
