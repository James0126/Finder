import { Coins } from "@terra-money/terra.js";
import { readAmount, readDenom } from "@terra.kitchen/utils";
import { sortByDenom } from "../../scripts/coin";
import s from "./Rewards.module.scss";

const Rewards = ({ rewards, limit }: { rewards: Coins; limit: number }) => {
  const rewardLength = rewards.toArray().length;
  const coins = sortByDenom(rewards.toArray()).slice(0, limit);
  return (
    <>
      {coins.map((coin, key) => {
        const amount = readAmount(coin.amount.toNumber(), { comma: true });
        const denom = readDenom(coin.denom);
        const isLast = key === limit - 1;

        return (
          <span key={key}>
            {amount} {denom}
            {!isLast ? (
              ", "
            ) : limit < rewardLength ? (
              <span className={s.more}>+{rewardLength - limit}</span>
            ) : null}
          </span>
        );
      })}
    </>
  );
};

export default Rewards;
