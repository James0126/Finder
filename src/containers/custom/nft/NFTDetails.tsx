const NFTDetails = ({ data }: { data: object }) => {
  return (
    <div>
      <pre style={{ height: "600px" }}>{JSON.stringify(data, null, 2)}</pre>;
    </div>
  );
};

export default NFTDetails;
