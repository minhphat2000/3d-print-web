import React, {Component} from 'react';


import NavBar from './NavBar';
import { render } from "react-dom";
import Scene from "./Scene_Components/Scene"
import {Grid} from "semantic-ui-react";
import  Firebase, {FirebaseContext, withFirebase} from './Firebase&Database/'
import * as firebase from 'firebase';
import {AuthUserContext} from './Session/';

class Home extends Component{
  
  constructor(props){
    super(props);
    
  }

  
  



render(){
  
  return (
    <div id="parent">
      
      <div>
          <div>
            <AuthUserContext.Consumer>
              {auth => <NavBar a={'p'} authUser={auth}/>}
            </AuthUserContext.Consumer>
        </div>
      </div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <React.Fragment>
          <Scene/>
        </React.Fragment>
      </Grid.Column>
    </Grid>  
  </div>
  );
}
}
export default withFirebase(Home);
