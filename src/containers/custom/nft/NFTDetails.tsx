const NFTDetails = ({ data }: { data: object }) => {
  return <pre style={{ height: "600px" }}>{JSON.stringify(data, null, 2)}</pre>;
};

export default NFTDetails;
