import React, {useContext} from 'react';
import './App.css';
import {Switch, Route, Redirect} from "react-router-dom"
import {UserContext} from "./context/UserProvider"

import Navbar from './components/Navbar'
import Auth from "./components/Auth"
import Read from "./pages/Read"
import Unread from "./pages/Unread"
import AddBook from "./pages/AddBook"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  const { token, logout } = useContext(UserContext)
  return (
    <div className="App">
      { token && <Navbar logout={logout} />}
      <Switch>
          <Route exact path="/" render={() => token ? <Redirect to="/unread" /> : <Auth />} />
          <ProtectedRoute path="/read" component={Read} redirectTo="/" token={token} />
          <ProtectedRoute path="/unread" component={Unread} redirectTo="/" token={token} />
          <ProtectedRoute path="/add" component={AddBook} redirectTo="/" token={token} />
      </Switch>
    </div>
  );
}

export default App;
