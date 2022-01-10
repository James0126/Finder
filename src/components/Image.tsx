type Props = {
  size?: string;
  url: string;
};

const Image = (props: Props) => {
  const { url } = props;
  //임시
  return <img width="60px" height="60px" alt="icon" src={url} />;
};

export default Image;
