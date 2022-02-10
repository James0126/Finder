import { useCW721Tokens } from "../../../queries/wasm";
import Card from "../../../components/Card";
import Image from "../../../components/Image";
import NFTAssetItem from "./NFTAssetItem";
import ExternalLink from "../../../components/ExternalLink";

interface Props extends CW721ContractItem {
  address: string;
}

const NFTAssetGroup = (props: Props) => {
  const { contract, name, icon, address, marketplace } = props;
  const { data } = useCW721Tokens(contract, address);

  const renderExtra = () => {
    if (!marketplace?.length) return null;
    const [link] = marketplace;
    return <ExternalLink href={link}>{"Collection"}</ExternalLink>;
  };

  const title = (
    <>
      {icon && <Image url={icon} size={100} />}
      {name} {renderExtra()}
    </>
  );

  const render = () => {
    if (!data) return null;
    const { tokens } = data;
    if (!tokens.length) return null;
    return tokens.map((id) => (
      <NFTAssetItem contract={contract} id={id} compact key={id} />
    ));
  };

  return <Card title={title}>{render()}</Card>;
};

export default NFTAssetGroup;
