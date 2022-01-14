import { Coin } from "@terra-money/terra.js";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import {
  getFindMoniker,
  useDelegations,
  useValidators,
} from "../../queries/validator";
import Card from "../../components/Card";
import Amount from "../../components/Amount";
import Table from "../../components/Table";

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
      render: ({ amount, denom }: Coin) => (
        <Amount
          amount={readAmount(amount.toString(), { comma: true })}
          denom={readDenom(denom)}
        />
      ),
    },
  ];

  const data = delegations.map((validator) => {
    const { validator_address, balance } = validator;
    const moniker = getFindMoniker(validators)(validator_address);
    return {
      moniker: moniker,
      amount: balance,
    };
  });

  return delegations.length ? (
    <Card title={"Delegations"}>
      <Table columns={cols} dataSource={data} />
    </Card>
  ) : null;
};

export default Delegations;
