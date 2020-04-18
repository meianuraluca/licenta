import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login/login'
import About from './components/about/about'
import Register from './components/register/register'
import Home from './components/home/home'
import Menu from './components/menu/menu';
import RegisterAssociation from './components/register/rigisterAssociation';
import pageAnnounce from './components/pageAnnounce/pageAnnounce';
import showAdd from './components/pageAnnounce/showAd/showAd';
import Protected from './components/protected/protected';
import showAssociations from './components/showAssociations/showAssociations';
import Contact from './components/contact/contact'

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Menu className="menu" ></Menu>
        <div className="box">
          <Switch >
              <Route exact path='/' component={Home}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/addPost' component={Protected}/>
              <Route exact path='/contact' component={Contact}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/showAd' component={showAdd}/>
              <Route exact path='/announces' component={pageAnnounce}/>
              <Route exact path='/associations' component={showAssociations}/>
              <Route exact path='/registerAssoc' component={RegisterAssociation}/>
            </Switch>
            
            </div>
      </div>
    );
  }

}

export default App;
