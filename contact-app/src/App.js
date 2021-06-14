import React, {Component} from 'react';
import './App.css';
import Homepage from './pages/homepage';
import Articlepage from './pages/articlepage';
import Articlelistpage from './pages/articlelistpage';
import Aboutpage from './pages/aboutpage';
import NavBar from './NavBar';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

class App extends Component{
  render(){
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <div id="page-body">
      <Switch>
      <Route path='/' component={Homepage} exact/>
      <Route path='/about' component={Aboutpage} exact/>
      <Route path='/articles-list' component={Articlelistpage} exact/>
      <Route path='/articles/:name' component={Articlepage} exact/>
      <Route component={NotFoundPage}/>
      </Switch>
    </div></div>
    </Router>
  );
}
}

export default App;
