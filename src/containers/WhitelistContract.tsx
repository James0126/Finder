import { useCW20Contracts, useCW721Contracts } from "../queries/assets";
import Image from "../components/Image";

const WhitelistContract = ({ address }: { address: string }) => {
  const cw20Contracts = useCW20Contracts();
  const cw721Contracts = useCW721Contracts();

  const cw20 = cw20Contracts?.[address];
  const cw721 = cw721Contracts?.[address];

  return cw20 ? (
    <div>
      <Image url={cw20.icon} />
      {cw20.protocol} | {cw20.name}
    </div>
  ) : cw721 ? (
    <div>
      <Image url={cw721.icon} />
      {cw721.name}
    </div>
  ) : null;
};

export default WhitelistContract;
