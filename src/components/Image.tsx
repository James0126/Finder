type Props = {
  size?: number;
  url: string;
};

const Image = (props: Props) => {
  const { url, size = 60 } = props;
  const imgSize = { width: `${size}px`, height: `${size}px` };
  return <img {...imgSize} alt="icon" src={url} />;
};

export default Image;
