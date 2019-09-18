import React, {Component} from 'react';


import NavBar from './NavBar';
import { render } from "react-dom";
import Scene from "./Scene_Components/Scene"
import {Grid, Label} from "semantic-ui-react";
import  { withFirebase} from './Firebase&Database/'
import {AuthUserContext} from './Session/';

class Home extends Component{
  
  constructor(props){
    super(props);
    
  }

  
  



render(){
  //Dynamic Categories Required
  return (
    <div id="parent">
      
    <div>
        <div>
          <AuthUserContext.Consumer>
            {auth => <NavBar a={'p'} authUser={auth}/>}
          </AuthUserContext.Consumer>
      </div>
    </div>
    <Grid columns={3} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>  
      <Grid.Column style={{ maxWidth: 450 }}>
        <span>Cube</span>
          <React.Fragment>
            <Scene obj={'cube'}/>
          </React.Fragment>
          
        
      </Grid.Column>
      <Grid.Column style={{ maxWidth: 450 }}>
        <span>Cube</span>
          <React.Fragment>
            <Scene  obj={'cube'}/>
          </React.Fragment>
          
        
      </Grid.Column>
      <Grid.Column style={{ maxWidth: 450 }}>
        <span>Cube</span>
          <React.Fragment>
            <Scene obj={'cube'}/>
          </React.Fragment>
          
        
      </Grid.Column>
      
    </Grid>  
  </div>
  );
}
}
export default withFirebase(Home);
