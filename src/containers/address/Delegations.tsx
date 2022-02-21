import { readAmount, readDenom } from "@terra.kitchen/utils";
import { getFindMoniker } from "../../queries/validator";
import { useDelegations, useValidators } from "../../queries/staking";
import { useDelegationReward } from "../../queries/distribution";
import Card from "../../components/Card";
import Amount from "../../components/Amount";
import Table from "../../components/Table";
import FinderLink from "../../components/FinderLink";
import Rewards from "./Rewards";
import s from "./Delegations.module.scss";

const Delegations = ({ address }: { address: string }) => {
  const { data: delegation } = useDelegations(address);
  const { data: delegationReward } = useDelegationReward(address);
  const { data: validators } = useValidators();

  if (!delegation || !validators || !delegationReward) {
    return null;
  }

  const [delegations] = delegation;

  const cols = [
    { title: "Status", key: "status" },
    { title: "Validator", key: "moniker" },
    { title: "Amount", key: "amount" },
    { title: "Rewards", key: "rewards" },
  ];

  const data = delegations.map((validator) => {
    const { validator_address, balance } = validator;
    const moniker = getFindMoniker(validators)(validator_address);
    const rewards = delegationReward.rewards[validator_address];
    const amount = readAmount(balance.amount.toString(), { comma: true });
    const denom = readDenom(balance.denom);
    //TODO : Status
    return {
      status: <span className={s.status}>Active</span>,
      moniker: (
        <FinderLink validator value={validator_address} children={moniker} />
      ),
      amount: <Amount amount={amount} denom={denom} className={s.amount} />,
      rewards: <Rewards rewards={rewards} limit={5} />,
    };
  });

  return delegations.length ? (
    <Card bordered className={s.card}>
      <Table columns={cols} dataSource={data} tableClassname={s.table} />
    </Card>
  ) : null;
};

export default Delegations;
