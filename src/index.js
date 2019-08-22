import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import Login from './Menu_Components/Login'
import Register from './Menu_Components/Register'
import {BrowserRouter,Switch,Route,withRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import  Firebase, {FirebaseContext, withFirebase} from './Firebase&Database/';
import { compose } from 'recompose';
import NavBar from './NavBar';
import UploadRouter from './Scene_Components/UploadRouter';
import {withAuthentication} from './Session/';
const Registrator = compose(
    withRouter,
    withFirebase,
)(Register);
const LoginPage = compose(
    withRouter,
    withFirebase,

)(Login);




function Routing(){
    return(
<BrowserRouter>
    <Switch>
        <Route exact path="/" component={withAuthentication(Home)}/>
        <Route path="/Login" component={LoginPage}></Route>
        <Route path="/Register" component={Registrator}></Route>
        <Route path="/Upload" component={withAuthentication(UploadRouter)}></Route>
    </Switch>
</BrowserRouter>
    );
    
}
export default Routing;

 ReactDOM.render(
     <div id="parent">
     
    <FirebaseContext.Provider value={new Firebase()}>
        <Routing/>

    </FirebaseContext.Provider> 
    </div>
    
    ,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
