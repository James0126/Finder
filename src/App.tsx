import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./containers/global/Header";
import useInitRuleset from "./hooks/useInitRuleset";
import routes from "./routes";
import s from "./App.module.scss";

const App = () => {
  useInitRuleset();
  return (
    <section>
      <Header />
      <div className={s.app}>
        <ErrorBoundary>{routes}</ErrorBoundary>
      </div>
    </section>
  );
};

export default App;
