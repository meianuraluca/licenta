import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Login from './components/login/login'
import About from './components/about/about'
import Register from './components/register/register'
import Home from './components/home/home'
import Menu from './components/menu/menu';
import RegisterAssociation from './components/register/rigisterAssociation';
import pageAnnounces from './components/pageAnnounce/pageAnnounce';
import showAd from './components/pageAnnounce/showAd/showAd'
import Protected from './components/protected/protected';
import showAssociations from './components/showAssociations/showAssociations';
import Contact from './components/contact/contact'
import ProfileAssociation from './components/showAssociations/profileAssociation/profileAssociation';
import ProfileAssociationForUser from './components/showAssociations/profileAssociation/profileAssociationForUser';
import Modal from './components/showAssociations/profileAssociation/modal/modal';
import PageUserAnnounces from './components/pageAnnounce/pageUserAnnounce';
import Bar from './components/bar/bar';

class App extends React.Component {
  render(){
    return (
      <div className="App">
          <div className="box">
          <div className="navBar">
        <Bar/>
          <Menu className="menu" ></Menu>
          </div>
          <Switch >
              <Route exact path='/' component={Home}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/addPost' component={Protected}/>
              <Route exact path='/contact' component={Contact}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
              <Route path='/showAdd'  component={showAd}/>
              <Route exact path='/announces' component={pageAnnounces}/>
              <Route exact path='/listUserAnnounces' component={PageUserAnnounces}/>
              <Route exact path='/associations' component={showAssociations}/>
              <Route exact path='/profileAssociation' component={ProfileAssociation}/>
              <Route exact path='/profileAssociationForUser' component={ProfileAssociationForUser}/>
              <Route exact path='/editProfileAssociation' component={Modal}/>
              <Route exact path='/registerAssoc' component={RegisterAssociation}/>
            </Switch>
            </div>
      </div>
    );
  }
}
export default App;
