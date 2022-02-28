import { Link, useParams } from "react-router-dom";
import { FlexColumn } from "../components/layout/Flex";
import Button from "../components/Button";
import Page from "../components/Page";
import s from "./NotFound.module.scss";

const NotFound = () => {
  const { keyword = "" } = useParams();
  const searchKeyword = <span className={s.keyword}>{keyword}</span>;
  return (
    <Page title="Search not found" alignCenter titleClassName={s.title}>
      <FlexColumn gap={40}>
        <p className={s.desc}>
          Sorry, we couldn't find any results for a {searchKeyword}
          <br /> Please input the correct block number, transaction hash or
          account address.
        </p>
        <Link to="/" className={s.button}>
          <Button primary>Back to Home </Button>
        </Link>
      </FlexColumn>
    </Page>
  );
};

export default NotFound;
