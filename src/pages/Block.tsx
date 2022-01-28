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
  const { data: blockInfo } = useTxsByHeight(height);
  const { data: validators } = useValidators();
  const { data: validatorSet } = useValidatorSet(Number(height));

  if (!blockInfo || !validators || !validatorSet) {
    return null;
  }

  const { header } = blockInfo.tx.byHeight;
  const { proposer_address, chain_id, time } = header;
  const hex = Buffer.from(proposer_address, "base64").toString("hex");
  const operatorAddress = getValidatorOperatorAddressByHexAddress(
    validators,
    validatorSet,
    hex
  );
  const moniker = getFindMoniker(validators)(operatorAddress);
  const dataSource = [
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
      content: (
        <FinderLink validator value={operatorAddress}>
          {moniker}
        </FinderLink>
      ),
    },
  ];

  const buttons = (
    <div>
      <Link to={`../blocks/${Number(height) - 1}`}>
        <button>Prev</button>
      </Link>
      <Link to={`../blocks/${Number(height) + 1}`}>
        <button>Next</button>
      </Link>
    </div>
  );

  return (
    <section>
      <h1>Block Page</h1>
      <List dataSource={dataSource} />
      {buttons}
      <Transactions height={height} />
    </section>
  );
};

export default Block;
