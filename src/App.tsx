import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import { useCurrentChain } from "./contexts/chainsContext";
import routes from "./routes";

const App = () => {
  const chain = useCurrentChain();
  console.log(chain);

  return (
    <section>
      <Header />
      <ErrorBoundary>{routes}</ErrorBoundary>
    </section>
  );
};

export default App;
