import { useState } from "react";

type Props = {
  url: string;
  size?: number;
  className?: string;
};

const Image = (props: Props) => {
  const { url, className, size = 60 } = props;
  const [isError, setError] = useState(false);
  const imgSize = { width: `${size}px`, height: `${size}px` };
  const src = !isError && url;
  return src ? (
    <img
      {...imgSize}
      onError={() => setError(true)}
      alt="icon"
      src={url}
      className={className}
    />
  ) : null;
};

export default Image;
