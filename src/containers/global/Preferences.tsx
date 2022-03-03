import LanguageIcon from "@mui/icons-material/Language";
import PopoverNone from "../../components/PopoverNone";
import { Popover } from "../../components/Tooltip";
import Tabs from "../../components/Tabs";
import SelectCurrency from "./SelectCurrency";
import SelectNetworks from "./SelectNetwork";

const Preferences = () => {
  const network = {
    key: "network",
    tab: "Network",
    children: <SelectNetworks />,
  };

  const currency = {
    key: "currency",
    tab: "Currency",
    children: <SelectCurrency />,
  };

  const tabs = [network, currency];

  return (
    <Popover
      content={
        <PopoverNone>
          <Tabs tabs={tabs} type="line" state />
        </PopoverNone>
      }
      placement="bottom"
      theme="none"
    >
      <LanguageIcon style={{ fontSize: 20, cursor: "pointer" }} />
    </Popover>
  );
};

export default Preferences;
