import { useParams } from "react-router";
import { Link } from "react-router-dom";
import FinderLink from "../components/FinderLink";
import List from "../components/List";
import Transactions from "../containers/block/Transactions";
import { useTxsByHeight } from "../queries/transaction";
import {
  getFindMoniker,
  getValidatorOperatorAddressByHexAddress,
  useValidators,
  useValidatorSet,
} from "../queries/validator";
import { fromISOTime } from "../scripts/date";

const Block = () => {
  const { height = "" } = useParams();
  const data = useTxsByHeight(height);
  const { data: validators } = useValidators();
  const { data: validatorSet } = useValidatorSet();

  if (!data || !validators || !validatorSet) return null;

  const { proposer_address, chain_id, time } = data.tx.byHeight.header;
  const hex = Buffer.from(proposer_address, "base64").toString("hex");
  const operatorAddress = getValidatorOperatorAddressByHexAddress(
    validators,
    validatorSet,
    hex
  );
  const moniker =
    operatorAddress && getFindMoniker(validators)(operatorAddress);
  const contents = [
    {
      title: "height",
      content: height,
    },
    {
      title: "chain id",
      content: chain_id,
    },
    {
      title: "time",
      content: fromISOTime(new Date(time)),
    },
    {
      title: "proposer",
      content: moniker && (
        <FinderLink validator value={operatorAddress}>
          {moniker}
        </FinderLink>
      ),
    },
  ];

  return (
    <section>
      <h1>Block Page</h1>
      <List data={contents} />
      {heightButton(Number(height))}
      <Transactions height={height} />
    </section>
  );
};

export default Block;

const heightButton = (height: number) => (
  <div>
    <Link to={`../blocks/${height - 1}`}>
      <button>Prev</button>
    </Link>
    <Link to={`../blocks/${height + 1}`}>
      <button>Next</button>
    </Link>
  </div>
);
