import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./containers/Header";
import routes from "./routes";

const App = () => (
  <section>
    <Header />
    <ErrorBoundary>{routes}</ErrorBoundary>
  </section>
);

export default App;
