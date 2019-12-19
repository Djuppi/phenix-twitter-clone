import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login'
import Feed from './components/Feed';
import Logout from './components/Logout';
import Authenticate from './components/Authenticate';
import Signup from './components/Signup';
import './App.css';


function App() {
  return (
    <div>
      <header>
        <nav>
          <img src="/Logo.png"/>
          <h1>TwitterClone</h1>
          {/* <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button">Action</button>
    <button class="dropdown-item" type="button">Another action</button>
    <button class="dropdown-item" type="button">Something else here</button>
  </div>
</div> */}
        </nav>
      </header>
      <div className="main">
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Authenticate}/>
          <Route path="/home" component={Feed}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/login" component={Login}/>
          <Route path="/Signup" component={Signup}/>
        </Switch>
      </HashRouter>
      </div>
      <footer>
        <p>Icons mad by Freepik from www.flaticon.com</p>
      </footer>
    </div>
  );
}

export default App;
