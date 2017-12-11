import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import Signup from "./Signup"
import Profile from "./Profile";
import UserActivity from "./UserActivity";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: '',
        userid:''
    };

    handleSubmit = (userdata) => {
        //alert(JSON.stringify(userdata));
        userdata={email:userdata.username,password:userdata.password}
       // alert("-------------" + JSON.stringify(userdata));
        API.doLogin(userdata)
            .then((res) => {
                alert("-------------" + JSON.stringify(res[0].id));
                alert("-------------" + JSON.stringify(res[0].email));
                if (res) {
                    localStorage.setItem("root", res[0].id);
                    localStorage.setItem( "userid", res[0].id);
                   //alert("In newerhomepage" +JSON.stringify(res.email));
                    this.setState({
                        isLoggedIn: true,
                        message: "",
                        username: res[0].email,
                        //filelist:res.filelist,
                        root:res[0].id,
                        userid: res[0].id
                    });
                    localStorage.setItem("username", res[0].email);
                   this.props.history.push("/welcome");
                } else if (res.status === '') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };
    handleSignUp = (userdata) => {
        alert("in signup" + JSON.stringify(userdata));
        API.doSignup(userdata)
            .then((res) => {
                alert("back in handle signup response : "+JSON.stringify(res));
                if (res) {
                    this.setState({
                        message: ""
                    });
                    this.props.history.push("/login");
                }
                else if(res== '')
                {
                    this.setState({
                        message: JSON.stringify(res.errors)
                    });
                    console.log(this.state.message);

                }

            })};

    handleLogout = () => {
        console.log('logout called');
        API.logout()
            .then((status) => {
                if(status === 200){
                    this.setState({
                        isLoggedIn: false
                    });
                    this.props.history.push("/");
                }
            });
    };

    handleProfile = (userdata) =>
    {

        var userid = localStorage.getItem("userid");
      /*  if(userdata.education == null){
            userdata.education = ""
        }*/

        var payload={"userid":userid,"firstname":userdata.firstname, "lastname":userdata.lastname,"contact":userdata.contact,"work":userdata.work,"education":userdata.education,"music":userdata.music,"shows":userdata.shows,"sports":userdata.sports};
        alert("Here in handle profile " +JSON.stringify(payload));
        API.dohandleProfile(payload)
            .then((res) => {
            alert("edit profile response" +JSON.stringify(res));
                if (res === '201') {
                    this.setState({
                    message: ""
                    });
                    this.props.history.push("/welcome");
                }
                else if(res.status === '401')
                {
                    this.setState({
                        message: JSON.stringify(res.errors)
                    });
                    console.log(this.state.message);

                }
            })
    };


    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>

                        <button className="btn btn-primary" onClick={() => {
                            this.props.history.push("/login");
                        }}>
                            DropBox !
                        </button>
                    </div>
                )}/>

                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/welcome" render={() => (
                    <Welcome handleLogout={this.handleLogout} username={this.state.username}/>
                )}/>
                <Route exact path="/signup" render={() => (
                    <div>
                        <Signup handleSignUp={this.handleSignUp}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>

                <Route exact path="/profile" render={() => (
                    <div>
                        <Profile handleProfile={this.handleProfile}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/userActivity" render={() => (
                    <div>
                        <UserActivity handleUserActivity={this.props.handleUserActivity}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>

            </div>
        );
    }
}

export default withRouter(NewerHomePage);