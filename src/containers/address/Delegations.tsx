import { readAmount, readDenom } from "@terra.kitchen/utils";
import {
  getFindMoniker,
  useDelegations,
  useValidators,
} from "../../queries/validator";
import Card from "../../components/Card";
import Amount from "../../components/Amount";
import Table from "../../components/Table";
import FinderLink from "../../components/FinderLink";

const Delegations = ({ address }: { address: string }) => {
  const { data: delegation } = useDelegations(address);
  const { data: validators } = useValidators();

  if (!delegation || !validators) {
    return null;
  }

  const [delegations] = delegation;

  const cols = [
    {
      title: "Moniker",
      key: "moniker",
    },
    {
      title: "Amount",
      key: "amount",
    },
  ];

  const data = delegations.map((validator) => {
    const { validator_address, balance } = validator;
    const moniker = getFindMoniker(validators)(validator_address);
    const amount = readAmount(balance.amount.toString(), { comma: true });
    const denom = readDenom(balance.denom);
    const data = {
      moniker: (
        <FinderLink validator value={validator_address} children={moniker} />
      ),
      amount: <Amount amount={amount} denom={denom} />,
    };
    return { data };
  });

  return delegations.length ? (
    <Card title={"Delegations"}>
      <Table columns={cols} dataSource={data} />
    </Card>
  ) : null;
};

export default Delegations;
