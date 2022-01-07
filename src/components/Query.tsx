import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import "ace-builds";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import AceEditor from "react-ace";
import { isJson } from "../scripts/utility";
import { useLCDClient } from "../queries/lcdClient";
import Card from "./Card";

const ACE_PROPS = {
  mode: "json",
  theme: "github",
  name: "JSON",
  width: "100%",
  height: "160px",
  autoComplete: "off",
  className: "form-control",
  showGutter: false,
  highlightActiveLine: false,
  editorProps: { $blockScrolling: true },
};

/* TODO: Refactor codes */
const Query = () => {
  const lcd = useLCDClient();
  const { address = "" } = useParams();
  const [query, setQuery] = useState<string>();
  const [data, setData] = useState<string>();
  const [error, setError] = useState<any>();

  const reset = () => {
    setError(undefined);
    setQuery(undefined);
    setData(undefined);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const params = query && JSON.parse(query);
      const data = await lcd.wasm.contractQuery(address, params);
      const result = JSON.stringify(data, null, 2);

      setData(result);
    } catch (error) {
      setError(error);
    }
  };

  const backButton = <button onClick={reset}>Go Back</button>;

  return error ? (
    <>
      {backButton}
      <Card title={"Error"}>{error.message}</Card>
    </>
  ) : data ? (
    <>
      {backButton}
      <Card title={"Query Result"}>
        <h2>JSON Output</h2>
        <pre>{data}</pre>
      </Card>
    </>
  ) : (
    <>
      <Card title={"Query"}>
        <form onSubmit={submit}>
          <h2>Contract Address</h2>
          <input readOnly value={address} />
          <h2>QueryMsg JSON</h2>

          <AceEditor
            {...ACE_PROPS}
            onChange={setQuery}
            onLoad={(editor) => {
              editor.renderer.setPadding(15);
              editor.renderer.setScrollMargin(15, 15, 15, 15);
            }}
          />

          <button disabled={!isJson(query)} type="submit">
            Next
          </button>
        </form>
      </Card>
    </>
  );
};

export default Query;
