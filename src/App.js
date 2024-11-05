import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BlockDetails from "./BlockDetails";
import BlockTransactions from "./BlockTransactions";
import TransactionDetails from "./TransactionDetails";
import AddressDetails from "./AddressDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/block/:blockNumber" element={<BlockDetails />} />
          <Route path="/block/:blockNumber/transactions" element={<BlockTransactions />} />
          <Route path="/transaction/:transactionHash" element={<TransactionDetails />} />
          <Route path="/address/:address" element={<AddressDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
