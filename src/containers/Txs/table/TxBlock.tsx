import { memo } from "react";
import FinderLink from "../../../components/FinderLink";
import { fromISOTime } from "../../../scripts/date";

interface Props {
  height: string;
  timestamp: string;
  className?: string;
}

const TxBlock = ({ height, timestamp, className }: Props) => {
  return (
    <div className={className}>
      <FinderLink block children={height} />
      <br />
      <span>{fromISOTime(new Date(timestamp))}</span>
    </div>
  );
};

export default memo(TxBlock);
