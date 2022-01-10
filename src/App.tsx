import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Search from "./containers/Search";
import SelectCurrency from "./containers/SelectCurrency";
import SelectNetworks from "./containers/SelectNetwork";
import routes from "./routes";

const App = () => (
  <section>
    <Header>
      <SelectNetworks />
      <SelectCurrency />
      <Search />
    </Header>
    <ErrorBoundary>{routes}</ErrorBoundary>
  </section>
);

export default App;
