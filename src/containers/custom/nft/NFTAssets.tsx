import NFTAssetGroup from "./NFTAssetGroup";
import { useCustomTokensCW721 } from "../../settings/CustomTokens";

const NFTAssets = ({ address }: { address: string }) => {
  const { list } = useCustomTokensCW721();
  const empty = !list.length;

  //  const renderExtra = (render: boolean) => (
  //    <ModalButton
  //      title={t("NFT")}
  //      renderButton={(open) => {
  //        if (!render) return null

  //        return (
  //          <InternalButton onClick={open} chevron>
  //            {t("Add tokens")}
  //          </InternalButton>
  //        )
  //      }}
  //    >
  //      <ManageCustomTokensCW721 />
  //    </ModalButton>
  //  )

  return (
    <>
      {empty ? null : (
        <>
          {list.map((item) => (
            <NFTAssetGroup address={address} {...item} key={item.contract} />
          ))}
        </>
      )}

      {/* To maintain the modal even if empty is false when add an NFT */}
      {/* {renderExtra(empty)} */}
    </>
  );
};

export default NFTAssets;
