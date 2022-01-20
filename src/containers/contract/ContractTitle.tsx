import {
  useCW20ContractInfo,
  useCW20TokenInfo,
  useCW721ContractInfo,
} from "../../queries/assets";
import Image from "../../components/Image";

const ContractTitle = ({ address }: { address: string }) => {
  const cw20Contract = useCW20ContractInfo(address);
  const cw20Token = useCW20TokenInfo(address);
  const cw721 = useCW721ContractInfo(address);

  return cw20Contract ? (
    <div>
      <Image url={cw20Contract.icon} />
      {cw20Contract.protocol} | {cw20Contract.name}
    </div>
  ) : cw721 ? (
    <div>
      <Image url={cw721.icon} />
      {cw721.name} | {cw721.symbol}
    </div>
  ) : cw20Token ? (
    <div>
      {cw20Token.icon && <Image url={cw20Token.icon} />}
      {cw20Token.name} | {cw20Token.symbol}
    </div>
  ) : null;
};

export default ContractTitle;
