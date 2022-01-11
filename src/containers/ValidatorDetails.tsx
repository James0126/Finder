import { ReactNode, useMemo } from "react";
import { AccAddress, Validator } from "@terra-money/terra.js";
import { readPercent } from "@terra.kitchen/utils";
import { useUptime } from "../queries/oracle";
import { calcSelfDelegation, useVotingPowerRate } from "../queries/validator";
import { toNow } from "../scripts/date";
import FinderLink from "../components/FinderLink";
import Card from "../components/Card";
import { useNetworkName } from "../contexts/ChainsContext";

const ValidatorInfo = ({ validator }: { validator: Validator }) => {
  const { description, commission, operator_address, consensus_pubkey } =
    validator;
  const { commission_rates, update_time } = commission;
  const { max_change_rate, max_rate, rate } = commission_rates;
  const { moniker, details } = description;
  const { data: votingPower } = useVotingPowerRate(consensus_pubkey.key);
  const { data: uptime } = useUptime(operator_address);
  const network = useNetworkName();

  const contents = useMemo(() => {
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

  const account = AccAddress.fromValAddress(operator_address);
  const address = [
    {
      title: "Account",
      content: <FinderLink network={network}>{account}</FinderLink>,
    },
    { title: "Validator", content: <span>{operator_address}</span> },
  ];

  return (
    <Card>
      <h2>{moniker}</h2>
      <span>{"status"}</span>
      <p>{details}</p>
      {/* TODO: Table */}
      {render(contents)}
      {render(commissions)}
      {render(address)}
    </Card>
  );
};

export default ValidatorInfo;

type RenderData = {
  title: string;
  content: ReactNode;
};
const render = (data: RenderData[]) =>
  data.map(({ title, content }, key) => (
    <div key={key}>
      {title}: {content}
    </div>
  ));
