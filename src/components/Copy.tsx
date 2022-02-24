import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useTimeout from "../containers/settings/useTimeout";
import styles from "./Copy.module.scss";

const Copy = (props: CopyToClipboard.Props) => {
  const [copied, setCopied] = useState(false);
  useTimeout(() => setCopied(false), copied ? 1000 : 0);
  return (
    <CopyToClipboard {...props} onCopy={() => setCopied(true)}>
      <button type="button" className={styles.button}>
        <ContentCopyIcon fontSize="inherit" />
        {copied ? "Copied" : "Copy"}
      </button>
    </CopyToClipboard>
  );
};

export default Copy;
