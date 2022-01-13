import { readAmount } from "@terra.kitchen/utils";
import {
  getFindMoniker,
  useUndelegations,
  useValidators,
} from "../../queries/validator";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Amount from "../../components/Amount";

const Undelegations = ({ address }: { address: string }) => {
  const { data: validators } = useValidators();
  const { data: undelegations } = useUndelegations(address);

  if (!undelegations || !validators) {
    return null;
  }

  const title = [
    {
      title: "Moniker",
      key: "moniker",
    },
    {
      title: "Amount",
      key: "amount",
    },
  ];

  const data = undelegations.map((validator) => {
    const { entries, validator_address } = validator;
    const [entry] = entries;
    const amount = entry.balance.toString();
    const moniker = getFindMoniker(validators)(validator_address);
    const render = (
      <Amount amount={readAmount(amount, { comma: true })} denom={"Luna"} />
    );
    return { moniker: moniker, amount: render };
  });

  return undelegations.length ? (
    <Card title={"Undelegations"}>
      <Table columns={title} dataSource={data} />
    </Card>
  ) : null;
};

export default Undelegations;
