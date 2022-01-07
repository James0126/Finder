type Props = {
  size?: string;
  url: string;
};

const Image = (props: Props) => {
  const { size, url } = props;
  //임시
  return <img sizes={size || "60px"} alt="icon" src={url} />;
};

export default Image;
