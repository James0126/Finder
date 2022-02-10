import { truncate } from "@terra.kitchen/utils";
import { getIpfsGateway } from "../../../scripts/utility";
import { useTokenInfoCW721 } from "../../../queries/wasm";
import Image from "../../../components/Image";
import Modal from "../../../components/Modal";
import { WithFetching } from "../Fetching";
import NFTDetails from "./NFTDetails";

interface Props {
  contract: string;
  id: string;
  compact?: boolean;
}

const NFTAssetItem = ({ contract, id, compact }: Props) => {
  const { data, ...state } = useTokenInfoCW721(contract, id);
  const SIZE = compact
    ? { width: 50, height: 50 }
    : { width: 100, height: 100 };

  const renderPlaceholder = () => (
    <article>
      <div style={SIZE} />
      <h1>{truncate(id)}</h1>
    </article>
  );

  const render = () => {
    if (!data) return null;
    const { extension } = data;
    const name = extension?.name ?? truncate(id);
    const image = extension?.image;

    return (
      <article>
        <Image url={getIpfsGateway(image)} size={100} />
        <span>{name}</span>
        {compact && extension && (
          <Modal
            modalContent={
              <>
                <Image url={getIpfsGateway(image)} size={100} />
                <NFTDetails data={extension} />
              </>
            }
            buttonLabel="View"
          />
        )}
      </article>
    );
  };

  return (
    // skip loading indicator
    <WithFetching {...state}>
      {(progress, wrong) =>
        wrong ?? (progress ? renderPlaceholder() : render())
      }
    </WithFetching>
  );
};

export default NFTAssetItem;
