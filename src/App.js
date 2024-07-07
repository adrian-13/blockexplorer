import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import BlockDetails from "./BlockDetails";
import BlockTransactions from "./BlockTransactions";
import TransactionDetails from "./TransactionDetails"; // Import the new component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/block/:blockNumber" exact component={BlockDetails} />
          <Route
            path="/block/:blockNumber/transactions"
            exact
            component={BlockTransactions}
          />
          <Route
            path="/transaction/:transactionHash"
            exact
            component={TransactionDetails}
          />{" "}
          {/* New route */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
