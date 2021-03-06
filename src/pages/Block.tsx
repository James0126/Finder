import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { fromISOTime, toNow } from "../scripts/date";
import FinderLink from "../components/FinderLink";
import State from "../components/State";
import Flex from "../components/layout/Flex";
import { ListColumn } from "../components/List";
import Txs from "../containers/block/Txs";
import { combineState } from "../queries/query";
import { useValidators } from "../queries/staking";
import { useValidatorSet } from "../queries/tendermint";
import { useTxsByHeight } from "../queries/transaction";
import {
  getFindMoniker,
  getValidatorOperatorAddressByHexAddress,
} from "../queries/validator";
import s from "./Block.module.scss";
import Page from "../components/Page";

const Block = () => {
  const { height = "" } = useParams();
  const { data: blockInfo, ...blockInfoState } = useTxsByHeight(height);
  const { data: validators, ...validatorsState } = useValidators();
  const { data: validatorSet, ...validatorSetState } = useValidatorSet();

  const status = combineState(
    blockInfoState,
    validatorsState,
    validatorSetState
  );

  const render = () => {
    if (!blockInfo || !validators || !validatorSet) {
      return null;
    }

    const { header } = blockInfo.tx.by_height;
    const { tx_count } = header;
    const { proposer_address, chain_id, time } = header;
    const hex =
      chain_id === "columbus-5"
        ? Buffer.from(proposer_address, "base64").toString("hex")
        : proposer_address;

    const operatorAddress = getValidatorOperatorAddressByHexAddress(
      validators,
      validatorSet,
      hex
    );
    const moniker = getFindMoniker(validators)(operatorAddress);

    const proposer = moniker ? (
      <FinderLink validator value={operatorAddress}>
        {moniker}
      </FinderLink>
    ) : (
      hex
    );

    const iconStyle = { width: "8px", height: "8px" };

    const buttons = (
      <div className={s.buttonWrapper}>
        <button className={s.button}>
          <Link to={`../blocks/${Number(height) - 1}`} className={s.link}>
            <ArrowBackIos style={iconStyle} className={s.icon} />
            Previous
          </Link>
        </button>
        <button className={s.button}>
          <Link to={`../blocks/${Number(height) + 1}`} className={s.link}>
            Next
            <ArrowForwardIos style={iconStyle} className={s.icon} />
          </Link>
        </button>
      </div>
    );

    const dataSource = [
      {
        title: "Chain ID",
        content: chain_id,
      },
      {
        title: "Block height",
        content: (
          <Flex start>
            {height}
            {buttons}
          </Flex>
        ),
      },
      {
        title: "Timestamp",
        content: `${toNow(new Date(time))} | ${fromISOTime(new Date(time))}`,
      },
      {
        title: "Transactions",
        content: `${tx_count} Transactions`,
      },
      {
        title: "proposer",
        content: proposer,
      },
    ];

    return (
      <>
        <ListColumn
          dataSource={dataSource}
          mainClassname={s.list}
          titleClassname={s.title}
          rowClassname={s.row}
        />
        <Txs height={height} />
      </>
    );
  };

  return (
    <Page title={`Block #${height}`}>
      <State state={status}>{render()}</State>
    </Page>
  );
};

export default Block;
