import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routers/Home";

import Service from "./routers/Service";

import ResultPage from "./routers/ResultPage";
import UserMain from "./routers/UserMain";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/service" component={Service} />
                <Route path="/result" component={ResultPage} />
                <Route path="/main" component={UserMain} />
            </Switch>
        </Router>
    );
}

export default App;
