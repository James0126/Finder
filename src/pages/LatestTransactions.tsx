import Page from "../components/Page";
import LatestTxs from "../containers/index/LatestTxs";

const LatestTransactions = () => {
  return (
    <Page
      title="Latest Transactions"
      sentence="View up to 5 blocks of the latest transactions"
    >
      <LatestTxs />
    </Page>
  );
};

export default LatestTransactions;
