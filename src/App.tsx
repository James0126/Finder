import ErrorBoundary from "./components/ErrorBoundary";
import Search from "./components/Search";
import SelectCurrency from "./components/SelectCurrency";
import SelectNetworks from "./components/SelectNetwork";
import { useCurrentChain } from "./contexts/ChainsContext";
import routes from "./routes";

const App = () => {
  const chain = useCurrentChain();
  console.log(chain);

  return (
    <section>
      <SelectNetworks />
      <SelectCurrency />
      <Search />
      <ErrorBoundary>{routes}</ErrorBoundary>
    </section>
  );
};

export default App;
