import { ReactNode } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { fromISOTime, toNow } from "../scripts/date";
import FinderLink from "../components/FinderLink";
import State from "../components/State";
import Txs from "../containers/block/Txs";
import Flex from "../components/Flex";
import { combineState } from "../queries/query";
import { useValidators } from "../queries/staking";
import { useValidatorSet } from "../queries/tendermint";
import { useTxsByHeight } from "../queries/transaction";
import {
  getFindMoniker,
  getValidatorOperatorAddressByHexAddress,
} from "../queries/validator";
import s from "./Block.module.scss";

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
        <Link to={`../blocks/${Number(height) - 1}`}>
          <button className={s.button}>
            <ArrowBackIos style={iconStyle} className={s.icon} />
            Previous
          </button>
        </Link>
        <Link to={`../blocks/${Number(height) + 1}`}>
          <button className={s.button}>
            Next
            <ArrowForwardIos style={iconStyle} className={s.icon} />
          </button>
        </Link>
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
          <Flex>
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
      <section className={s.wrapper}>
        <h1 className={s.title}>
          <span className={s.bold}>Block</span> #{height}
        </h1>
        <Component dataSource={dataSource} />
        <Txs height={height} />
      </section>
    );
  };

  return <State state={status}>{render()}</State>;
};

export default Block;

type Data = {
  title: string;
  content: ReactNode;
};

const Component = ({ dataSource }: { dataSource: Data[] }) => (
  <div className={s.list}>
    {dataSource.map(({ title, content }) => (
      <Flex start key={title} className={s.row}>
        <div className={s.listTitle}>{title}</div>
        <div className={s.content}>{content}</div>
      </Flex>
    ))}
  </div>
);
