import React, {Component} from 'react';
import './App.css';
import Homepage from './pages/homepage';
import Articlepage from './pages/articlepage';
import Articlelistpage from './pages/articlelistpage';
import Aboutpage from './pages/aboutpage';
import NavBar from './NavBar';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class App extends Component{
  render(){
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <div id="page-body">
      <Route path='/' component={Homepage} exact/>
      <Route path='/about' component={Aboutpage} exact/>
      <Route path='/articles-list' component={Articlelistpage} exact/>
      <Route path='/article/:name' component={Articlepage} exact/>
    </div></div>
    </Router>
  );
}
}

export default App;
