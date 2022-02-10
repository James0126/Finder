import { useState } from "react";

type Props = {
  size?: number;
  url: string;
};

const Image = (props: Props) => {
  const { url, size = 60 } = props;
  const [isError, setError] = useState(false);
  const imgSize = { width: `${size}px`, height: `${size}px` };
  const src = !isError && url;
  return src ? (
    <img {...imgSize} onError={() => setError(true)} alt="icon" src={url} />
  ) : null;
};

export default Image;
