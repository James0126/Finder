import ErrorBoundary from "./components/ErrorBoundary";
import Search from "./components/Search";
import SelectNetworks from "./components/SelectNetwork";
import { useCurrentChain } from "./contexts/ChainsContext";

const App = () => {
  const chain = useCurrentChain();
  console.log(chain);

  return (
    <section>
      <SelectNetworks />
      <Search />
      <ErrorBoundary>{<></>}</ErrorBoundary>
    </section>
  );
};

export default App;
