import { useParams } from "react-router";
import { Link } from "react-router-dom";
import FinderLink from "../components/FinderLink";
import List from "../components/List";
import Transactions from "../containers/block/Transactions";
import { combineState } from "../queries/query";
import { useTxsByHeight } from "../queries/transaction";
import {
  getFindMoniker,
  getValidatorOperatorAddressByHexAddress,
  useValidators,
  useValidatorSet,
} from "../queries/validator";
import { fromISOTime } from "../scripts/date";
import PageRenderer from "./PageRenderer";

const Block = () => {
  const { height = "" } = useParams();
  const { data: blockInfo, ...blockInfoStatus } = useTxsByHeight(height);
  const { data: validators, ...validatorsStatus } = useValidators();
  const { data: validatorSet, ...validatorSetStatus } = useValidatorSet(
    Number(height)
  );

  const state = combineState(
    blockInfoStatus,
    validatorsStatus,
    validatorSetStatus
  );

  const render = () => {
    if (!blockInfo || !validators || !validatorSet) {
      return null;
    }

    const { txInfos, header } = blockInfo.tx.byHeight;
    const { proposer_address, chain_id, time } = header;
    const hex = Buffer.from(proposer_address, "base64").toString("hex");
    const operatorAddress = getValidatorOperatorAddressByHexAddress(
      validators,
      validatorSet,
      hex
    );
    const moniker = getFindMoniker(validators)(operatorAddress);
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
        content: (
          <FinderLink validator value={operatorAddress}>
            {moniker}
          </FinderLink>
        ),
      },
    ];

    return (
      <>
        <List data={contents} />
        {heightButton(Number(height))}
        <Transactions txs={txInfos} />
      </>
    );
  };

  return (
    <PageRenderer state={state}>
      <section>
        <h1>Block Page</h1>
        {render()}
      </section>
    </PageRenderer>
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
