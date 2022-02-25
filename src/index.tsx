import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitChains from "./contexts/ChainsContext";
import App from "./App";
import "./index.scss";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <InitChains>
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path=":network/*" element={<App />} />
          </Routes>
        </InitChains>
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById("root")
);
