import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import BlockDetails from "./BlockDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/block/:blockNumber" component={BlockDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
