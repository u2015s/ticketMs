import './App.css';
import React, { useEffect } from 'react';
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute'
// import { useHistory  } from "react-router-dom";
function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/signin">
            <SignIn />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
          </PrivateRoute>

        </Switch>
      </Router>

    </>
  );
}

export default App;
