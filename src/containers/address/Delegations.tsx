import { readAmount, readDenom } from "@terra.kitchen/utils";
import { getFindMoniker } from "../../queries/validator";
import { useDelegations, useValidators } from "../../queries/staking";
import Card from "../../components/layout/Card";
import FinderLink from "../../components/FinderLink";
import Amount from "../../components/Amount";
import Table from "../../components/Table";
import s from "./Delegations.module.scss";

const Delegations = ({ address }: { address: string }) => {
  const { data: delegation } = useDelegations(address);
  const { data: validators } = useValidators();

  if (!delegation || !validators) {
    return null;
  }

  const [delegations] = delegation;

  const cols = [
    { title: "Status", key: "status" },
    { title: "Validator", key: "moniker" },
    { title: "Amount", key: "amount" },
  ];

  const data = delegations.map((validator) => {
    const { validator_address, balance } = validator;
    const moniker = getFindMoniker(validators)(validator_address);
    const amount = readAmount(balance.amount.toString(), { comma: true });
    const denom = readDenom(balance.denom);
    //TODO : Status
    return {
      status: <span className={s.status}>Active</span>,
      moniker: (
        <FinderLink validator value={validator_address} children={moniker} />
      ),
      amount: <Amount amount={amount} denom={denom} mainClassName={s.amount} />,
    };
  });

  return delegations.length ? (
    <Card bordered className={s.card}>
      <Table columns={cols} dataSource={data} />
    </Card>
  ) : null;
};

export default Delegations;
