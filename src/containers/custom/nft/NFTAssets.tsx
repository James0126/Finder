import { useCustomTokensCW721 } from "../../settings/CustomTokens";
import List from "../../../components/List";
import NFTAssetGroup from "./NFTAssetGroup";
import s from "./NFTAssets.module.scss";

const NFTAssets = ({ address }: { address: string }) => {
  const { list } = useCustomTokensCW721();

  if (!list.length) return null;

  return (
    <List
      dataSource={[
        ...list.map((item) => ({
          content: (
            <NFTAssetGroup address={address} {...item} key={item.contract} />
          ),
        })),
      ]}
      itemClassName={s.item}
      mainClassName={s.list}
    />
  );
};

export default NFTAssets;
