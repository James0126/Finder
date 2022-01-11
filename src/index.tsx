import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitChains from "./contexts/ChainsContext";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
