import { useMemo } from "react";
import { Validator } from "@terra-money/terra.js";
import { readPercent } from "@terra.kitchen/utils";
import { useUptime } from "../queries/oracle";
import { calcSelfDelegation, useVotingPowerRate } from "../queries/validator";
import { toNow } from "../scripts/date";

const ValidatorInfo = ({ validator }: { validator: Validator }) => {
  const {
    description,
    jailed,
    commission,
    operator_address,
    consensus_pubkey,
  } = validator;
  const { commission_rates, update_time } = commission;
  const { max_change_rate, max_rate, rate } = commission_rates;
  const { moniker, details } = description;
  const { data: votingPower } = useVotingPowerRate(
    operator_address,
    consensus_pubkey.key
  );
  const { data: uptime } = useUptime(operator_address);

  const contents = useMemo(() => {
    if (!votingPower) return [];

    return [
      {
        title: "Voting power",
        content: readPercent(votingPower),
      },
      {
        title: "Self delegation",
        content: readPercent(calcSelfDelegation(validator)),
      },
      {
        title: "Uptime  Last 10k blocks",
        content: readPercent(uptime),
      },
    ];
  }, [votingPower, validator, uptime]);

  const commissions = useMemo(
    () => [
      {
        title: "Current",
        content: readPercent(Number(rate)),
      },
      {
        title: "Max",
        content: readPercent(Number(max_rate)),
      },
      {
        title: "Max daily change",
        content: readPercent(Number(max_change_rate)),
      },
      {
        title: "Last changed",
        content: toNow(new Date(update_time)),
      },
    ],
    [rate, max_rate, max_change_rate, update_time]
  );

  return (
    <div>
      <h2>{moniker}</h2>
      <span>{jailed ? "Jailed" : "Active"}</span>
      <p>{details}</p>
      {contents.map(({ title, content }, key) => (
        <div key={key}>
          <span>
            {title}: {content}
          </span>
        </div>
      ))}
      {commissions.map(({ title, content }, key) => (
        <div key={key}>
          <span>
            {title}: {content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ValidatorInfo;
