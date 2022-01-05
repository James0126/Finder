import { useParams } from "react-router";
import { useUnstaking, useValidators } from "../queries/validator";
import format from "../scripts/format";
import { getFindMoniker } from "../scripts/utility";

const Undelegations = () => {
  const { data: validators } = useValidators();
  const { address = "" } = useParams();
  const { data } = useUnstaking(address);

  if (!data || !validators) {
    return null;
  }

  return data.length ? (
    <article>
      <h2>Undelegations</h2>
      {data.map((validator, key) => {
        const { entries, validator_address } = validator;
        const [entry] = entries;
        const amount = entry.balance.toString();
        const moniker = getFindMoniker(validators)(validator_address);

        return (
          <div key={key}>{`${moniker} ${format.amount(amount)} Luna`}</div>
        );
      })}
    </article>
  ) : null;
};

export default Undelegations;
