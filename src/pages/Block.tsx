import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fromISOTime } from "../scripts/date";
import FinderLink from "../components/FinderLink";
import List from "../components/List";
import Page from "../components/Page";
import Transactions from "../containers/block/Transactions";
import { combineState } from "../queries/query";
import { useValidators } from "../queries/staking";
import { useValidatorSet } from "../queries/tendermint";
import { useTxsByHeight } from "../queries/transaction";
import {
  getFindMoniker,
  getValidatorOperatorAddressByHexAddress,
} from "../queries/validator";

const Block = () => {
  const { height = "" } = useParams();
  const { data: blockInfo, ...blockInfoState } = useTxsByHeight(height);
  const { data: validators, ...validatorsState } = useValidators();
  const { data: validatorSet, ...validatorSetState } = useValidatorSet(
    Number(height)
  );

  const status = combineState(
    blockInfoState,
    validatorsState,
    validatorSetState
  );

  const render = () => {
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
      <>
        <h1>Block Page</h1>
        <List dataSource={dataSource} />
        {buttons}
        <Transactions height={height} />
      </>
    );
  };

  return <Page state={status}>{render()}</Page>;
};

export default Block;
