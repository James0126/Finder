import { useParams } from "react-router";
import { useCW20Contracts, useCW721Contracts } from "../queries/assets";

const WhitelistContract = () => {
  const { address = "" } = useParams();
  const cw20Contracts = useCW20Contracts();
  const cw721Contracts = useCW721Contracts();

  const cw20 = cw20Contracts?.[address];
  const cw721 = cw721Contracts?.[address];

  const iconSize = { width: "60px", height: "60px" };

  return cw20 ? (
    <div>
      <img alt="icon" src={cw20.icon} {...iconSize} />
      {cw20.protocol} | {cw20.name}
    </div>
  ) : cw721 ? (
    <div>
      <img alt="icon" src={cw721.icon} {...iconSize} />
      {cw721.name}
    </div>
  ) : null;
};

export default WhitelistContract;
