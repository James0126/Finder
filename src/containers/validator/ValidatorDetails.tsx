import { useMemo } from "react";
import { AccAddress, Validator } from "@terra-money/terra.js";
import { readPercent } from "@terra.kitchen/utils";
import { useUptime } from "../../queries/oracle";
import { useSelfDelegation, useVotingPowerRate } from "../../queries/validator";
import { toNow } from "../../scripts/date";
import FinderLink from "../../components/FinderLink";
import Card from "../../components/Card";
import List from "../../components/List";

//Station 병합?
const ValidatorDetails = ({ validator }: { validator: Validator }) => {
  const { description, commission, operator_address, consensus_pubkey } =
    validator;
  const { commission_rates, update_time } = commission;
  const { max_change_rate, max_rate, rate } = commission_rates;
  const { moniker, details } = description;
  const { data: votingPower } = useVotingPowerRate(consensus_pubkey.key);
  const { data: uptime } = useUptime(operator_address);
  const selfDelegation = useSelfDelegation(validator);

  const contents = useMemo(
    () => [
      {
        title: "Voting power",
        content: readPercent(votingPower),
      },
      {
        title: "Self delegation",
        content: readPercent(selfDelegation),
      },
      {
        title: "Uptime  Last 10k blocks",
        content: readPercent(uptime),
      },
    ],
    [votingPower, uptime, selfDelegation]
  );

  const commissions = [
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
  ];

  const addresses = [
    {
      title: "Account",
      content: (
        <FinderLink>{AccAddress.fromValAddress(operator_address)}</FinderLink>
      ),
    },
    { title: "Validator", content: <span>{operator_address}</span> },
  ];

  return (
    <Card>
      <h2>{moniker}</h2>
      {/* TODO: Add status */}
      <span>{"status"}</span>
      <p>{details}</p>
      <List dataSource={[...contents, ...commissions, ...addresses]} />
    </Card>
  );
};

export default ValidatorDetails;
