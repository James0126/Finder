import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getChains, ChainsProvider } from "./contexts/ChainsContext";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
  },
});

getChains().then((chains) => {
  ReactDOM.render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChainsProvider value={chains}>
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path=":network/*" element={<App />} />
          </Routes>
        </ChainsProvider>
      </QueryClientProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
