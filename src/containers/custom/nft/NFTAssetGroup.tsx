import { useCW721Tokens } from "../../../queries/wasm";
import Card from "../../../components/layout/Card";
import Image from "../../../components/Image";
import List from "../../../components/List";
import ExternalLink from "../../../components/ExternalLink";
import NFTAssetItem from "./NFTAssetItem";
import s from "./NFTAssetGroup.module.scss";

interface Props extends CW721ContractItem {
  address: string;
}

const NFTAssetGroup = (props: Props) => {
  const { contract, name, icon, address, marketplace } = props;
  const { data } = useCW721Tokens(contract, address);

  const renderExtra = () => {
    if (!marketplace?.length) return null;
    const [link] = marketplace;
    return <ExternalLink href={link}>Collection</ExternalLink>;
  };

  const title = (
    <>
      {icon && <Image url={icon} size={24} className={s.icon} />}
      {name} {renderExtra()}
    </>
  );

  const render = () => {
    if (!data) return null;
    const { tokens } = data;
    if (!tokens.length) return null;

    return (
      <List
        dataSource={[
          ...tokens.map((id) => ({
            content: (
              <NFTAssetItem contract={contract} id={id} compact key={id} />
            ),
          })),
        ]}
        itemClassName={s.item}
        mainClassName={s.list}
      />
    );
  };

  return (
    <Card titleBackground bordered title={title}>
      {render()}
    </Card>
  );
};

export default NFTAssetGroup;
