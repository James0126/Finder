import {
  useCW20ContractInfo,
  useCW721ContractInfo,
} from "../../queries/assets";
import Image from "../../components/Image";

const ContractTitle = ({ address }: { address: string }) => {
  const cw20 = useCW20ContractInfo(address);
  const cw721 = useCW721ContractInfo(address);

  return cw20 ? (
    <div>
      <Image url={cw20.icon} />
      {cw20.protocol} | {cw20.name}
    </div>
  ) : cw721 ? (
    <div>
      <Image url={cw721.icon} />
      {cw721.name} | {cw721.symbol}
    </div>
  ) : null;
};

export default ContractTitle;
