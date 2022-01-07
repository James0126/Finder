import { useParams } from "react-router";
import {
  getFindMoniker,
  useUndelegations,
  useValidators,
} from "../queries/validator";
import format from "../scripts/format";
import Card from "./Card";

const Undelegations = () => {
  const { data: validators } = useValidators();
  const { address = "" } = useParams();
  const { data } = useUndelegations(address);

  if (!data || !validators) {
    return null;
  }

  return data.length ? (
    <Card title={"Undelegations"}>
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
