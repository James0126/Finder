import { useCW20Contracts, useCW721Contracts } from "../queries/assets";
import Image from "./Image";

const WhitelistContract = ({ address }: { address: string }) => {
  const cw20Contracts = useCW20Contracts();
  const cw721Contracts = useCW721Contracts();

  const cw20 = cw20Contracts?.[address];
  const cw721 = cw721Contracts?.[address];

  //임시
  const iconSize = "60px";

  return cw20 ? (
    <div>
      <Image url={cw20.icon} size={iconSize} />
      {cw20.protocol} | {cw20.name}
    </div>
  ) : cw721 ? (
    <div>
      <Image url={cw721.icon} size={iconSize} />
      {cw721.name}
    </div>
  ) : null;
};

export default WhitelistContract;
