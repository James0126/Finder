import { useParams } from "react-router";
import { useStaking, useValidators } from "../queries/validator";
import format from "../scripts/format";
import { getFindMoniker } from "../scripts/utility";

const Delegations = () => {
  const { address = "" } = useParams();
  const { data } = useStaking(address);
  const { data: validators } = useValidators();

  if (!data || !validators) {
    return null;
  }

  const [delegations] = data;

  return delegations.length ? (
    <article>
      <h2>Delegations</h2>
      <div>
        {delegations?.map((data, key) => {
          const { validator_address } = data;
          const moniker = getFindMoniker(validators)(validator_address);
          const { denom, amount } = data.balance;

          return (
            <div key={key}>
              <span>{moniker}</span>
              <span>{` ${format.amount(amount.toString())} ${format.denom(
                denom
              )}`}</span>
            </div>
          );
        })}
      </div>
    </article>
  ) : null;
};

export default Delegations;
