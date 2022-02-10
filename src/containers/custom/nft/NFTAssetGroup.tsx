import { useCW721Tokens } from "../../../queries/wasm";
import Card from "../../../components/Card";
import Image from "../../../components/Image";
import NFTAssetItem from "./NFTAssetItem";

interface Props extends CW721ContractItem {
  address: string;
}

const NFTAssetGroup = (props: Props) => {
  const { contract, name, icon, address } = props;
  const { data } = useCW721Tokens(contract, address);

  const title = (
    <>
      {icon && <Image url={icon} size={100} />}
      {name}
    </>
  );

  // const renderExtra = () => {
  //   if (!marketplace?.length) return null;
  //   const [link] = marketplace;
  //   return (
  //     <ExternalLink href={link} className={styles.link}>
  //       {"Collection"}
  //     </ExternalLink>
  //   );
  // };

  const render = () => {
    if (!data) return null;
    const { tokens } = data;
    if (!tokens.length) return null;
    return tokens.map((id) => (
      <NFTAssetItem contract={contract} id={id} compact key={id} />
    ));
  };

  return (
    <Card
      title={title}
      // extra={renderExtra()}
    >
      {render()}
    </Card>
  );
};

export default NFTAssetGroup;
