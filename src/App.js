import React, { createContext, useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import Login from "./component/Login";
import Signup from "./component/Signup";
import ErrorPage from "./component/Errorpage";
import Logout from "./component/Logout";

import { initialState, reducer } from "../src/reducer/UseReducer";

export const UserContext = createContext();
const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/">
        <Logout />
      </Route>

      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  )

}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>

      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
