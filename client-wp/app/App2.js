import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';


//Components
import Login from './components/login';
import ErrorPage from './components/error-page';


class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App container">
          <header className="App-header center">
            <Link to="/eventsdashboard" className="">
              <img className="App-logo" src="./assets/sapient-logo.png" />
            </Link>
            
            <h1 className="App-title">Event Management Tools</h1>
          </header>
          <section className="main" role="main">
            <Switch>
              <Route exact path="/" component={Login}  />
              
              <Route component={ErrorPage} />
            </Switch>
          </section>
          <footer className="App-footer center">
          <p>copyright © 2018</p>
          </footer>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
