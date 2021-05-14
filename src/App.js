import "./App.css";
import Carousel from "./Carousel/carousel";
import Navbar from "./Navbar/navbar";
import ViewTracking from "./ViewTracking/viewTracking";
import My404 from './My404/my404';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="contentApp">
        <Switch>
          <Route path="/" exact={true} component={Carousel}></Route>
          <Route
            path="/viewtrackings"
            exact={true}
            component={ViewTracking}
          ></Route>
          <Route path="*" exact={true} component={My404}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
