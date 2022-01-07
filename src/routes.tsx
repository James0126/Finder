import { Route, Routes } from "react-router-dom";
import Address from "./pages/Address";
import Block from "./pages/Block";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Validator from "./pages/Validator";

export default (
  <Routes>
    <Route index element={<Index />} />
    <Route path="blocks/:height" element={<Block />} />
    <Route path="block/:height" element={<Block />} />
    <Route path="txs/:height" element={<Block />} />
    <Route path="validator/:address" element={<Validator />} />
    <Route path="address/:address" element={<Address />} />
    <Route path="account/:address" element={<Address />} />
    <Route path="notfound/:keyword" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
