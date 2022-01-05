import { useParams } from "react-router";
import { useStaking } from "../queries/validator";
import format from "../scripts/format";

const Delegations = () => {
  const { address = "" } = useParams();
  const { data } = useStaking(address);

  console.log(data);

  if (!data) {
    return <></>;
  }

  const [delegations, validators] = data;

  return (
    <article>
      <h2>Delegations</h2>
      <div>
        {delegations?.map((data, key) => {
          const validator = validators[key];
          const { denom, amount } = data.balance;

          return (
            <div key={key}>
              <span>{validator.description.moniker}</span>
              <span>{` ${format.amount(amount.toString())} ${format.denom(
                denom
              )}`}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default Delegations;
