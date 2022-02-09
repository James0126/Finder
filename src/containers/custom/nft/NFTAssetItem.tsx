import classNames from "classnames/bind";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { truncate } from "@terra.kitchen/utils";
import { getIpfsGateway } from "../../../scripts/utility";
import { useTokenInfoCW721 } from "../../../queries/wasm";
import { InternalButton } from "../Internal";
import { WithFetching } from "../Fetching";
import NFTDetails from "./NFTDetails";
import styles from "./NFTAssetItem.module.scss";

const cx = classNames.bind(styles);

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
  const className = cx(styles.item, { compact });

  const renderPlaceholder = () => (
    <article className={className}>
      <div style={SIZE} className={cx(styles.image, styles.placeholder)} />
      <h1 className={styles.name}>{truncate(id)}</h1>
    </article>
  );

  const render = () => {
    if (!data) return null;
    const { extension } = data;
    const name = extension?.name ?? truncate(id);
    const image = extension?.image;

    return (
      <article className={className}>
        {/* {image && (
          <ModalButton
            title={name}
            renderButton={(open) => (
              <button type="button" onClick={open} className={styles.image}>
                <img src={getIpfsGateway(image)} alt="" {...SIZE} />
              </button>
            )}
          >
            <img src={getIpfsGateway(image)} alt="" className={styles.large} />
          </ModalButton>
        )} */}

        <h1 className={styles.name}>{name}</h1>

        {compact && (
          <>
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

                {extension && <NFTDetails data={extension} />}
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
