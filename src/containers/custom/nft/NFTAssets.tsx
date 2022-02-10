import NFTAssetGroup from "./NFTAssetGroup";
import { useCustomTokensCW721 } from "../../settings/CustomTokens";

const NFTAssets = ({ address }: { address: string }) => {
  const { list } = useCustomTokensCW721();

  if (!list.length) return null;

  return (
    <>
      {list.map((item) => (
        <NFTAssetGroup address={address} {...item} key={item.contract} />
      ))}
    </>
  );
};

export default NFTAssets;
