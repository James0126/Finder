import { useMemo } from "react";
import { AccAddress, Validator } from "@terra-money/terra.js";
import { readPercent } from "@terra.kitchen/utils";
import { useUptime } from "../../queries/oracle";
import {
  calcSelfDelegation,
  useVotingPowerRate,
} from "../../queries/validator";
import { toNow } from "../../scripts/date";
import FinderLink from "../../components/FinderLink";
import Card from "../../components/Card";
import { Content } from "../../types/components";

//Station 병합?
const ValidatorDetails = ({ validator }: { validator: Validator }) => {
  const { description, commission, operator_address, consensus_pubkey } =
    validator;
  const { commission_rates, update_time } = commission;
  const { max_change_rate, max_rate, rate } = commission_rates;
  const { moniker, details } = description;
  const { data: votingPower } = useVotingPowerRate(consensus_pubkey.key);
  const { data: uptime } = useUptime(operator_address);

  const contents = useMemo(
    () => [
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
    ],
    [votingPower, validator, uptime]
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

  const render = ({ title, content }: Content) => (
    <article key={title}>
      <h1>{title}</h1>
      <p>{content}</p>
    </article>
  );

  return (
    <Card>
      <h2>{moniker}</h2>
      {/* TODO: Add status */}
      <span>{"status"}</span>
      <p>{details}</p>
      {contents.map(render)}
      {commissions.map(render)}
      {addresses.map(render)}
    </Card>
  );
};

export default ValidatorDetails;
