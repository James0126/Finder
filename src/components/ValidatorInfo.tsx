import { Validator } from "@terra-money/terra.js";

const ValidatorInfo = ({ validator }: { validator: Validator }) => {
  const { description, jailed, commission } = validator;
  const { commission_rates, update_time } = commission;
  const { max_change_rate, max_rate, rate } = commission_rates;

  return (
    <div>
      <h2>{description.moniker}</h2>
      <span>{jailed ? "Jailed" : "Active"}</span>
      <p>{description.details}</p>
    </div>
  );
};

export default ValidatorInfo;
