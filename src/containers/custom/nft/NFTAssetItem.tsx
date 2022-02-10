import classNames from "classnames/bind";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { truncate } from "@terra.kitchen/utils";
import { getIpfsGateway } from "../../../scripts/utility";
import { useTokenInfoCW721 } from "../../../queries/wasm";
import Image from "../../../components/Image";
import { InternalButton } from "../Internal";
import { WithFetching } from "../Fetching";
import NFTDetails from "./NFTDetails";
import Modal from "../../../components/Modal";

interface Props {
  contract: string;
  id: string;
  compact?: boolean;
}

// Where to use
// 1. NFT asset list
// 2. Transfer tx form
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
        {/* {image && (
          <ModalButton
            title={name}
            renderButton={(open) => (
              <button type="button" onClick={open} className={styles.image}>
                <img src={getIpfsGateway(image)} alt="" {...SIZE} />
              </button>
            )}
          >
            
          </ModalButton>
        )} */}

        <span>{name}</span>

        {compact && (
          <>
            {extension && (
              <Modal
                modalContent={<NFTDetails data={extension} />}
                buttonLabel="View"
              />
            )}

            {/* <ModalButton
              title={name}
              renderButton={(open) => (
                <InternalButton onClick={open} disabled={!extension}>
                  <InfoOutlinedIcon style={{ fontSize: 18 }} />
                  {"View"}
                </InternalButton>
              )}
            >
              <>
                {image && (
                  <img
                    src={getIpfsGateway(image)}
                    alt="logo"
                    className={styles.large}
                  />
                )}

              </>
            </ModalButton> */}
          </>
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
