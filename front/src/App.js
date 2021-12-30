import "./App.css";
import React from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routers/Home";
import Login from "./routers/Login";
import Service from "./routers/Service";
import Regist from "./routers/Regist";
import MusicGenre from "./component/MusicGenre";
import MovieGenre from "./component/MovieGenre";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/regist" component={Regist} />
        <Route path="/service" component={Service} />
        <Route path="/MovieGenre" component={MovieGenre} />
        <Route path="/MusicGenre" component={MusicGenre} />
      </Switch>
    </Router>
  );
}

export default App;
