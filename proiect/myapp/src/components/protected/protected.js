import React from 'react';
import Login from '../login/login'
import AddPost from '../ad/addPost';

class Protected extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      accessToken: ''
    }
  }
    componentDidMount(){
    if (localStorage.getItem('accessToken') !== null) {
        let access = window.localStorage.getItem('accessToken');
        access = this.getClaims(access);
        let result = access.identity;
        console.log(result)
        this.setState({accessToken: result})
      }
    }
    getClaims = accessToken => {
        if (!accessToken) return {};
        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
      };
  render(){
    console.log(this.state.accessToken)
    return (
      <div>
        {this.state.accessToken === '' ? <Login/> : <AddPost/>}
      </div>
    );
  }
}

export default Protected;
