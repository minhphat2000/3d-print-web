import React, {Component} from 'react';
import {
    Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive,
  Button
} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import SignOutButton from './Menu_Components/SignOutButton';
import { compose } from 'recompose';
import { withFirebase } from './Firebase&Database';
import {withRouter} from 'react-router-dom'
import { string } from 'postcss-selector-parser';
class NavBar extends Component{
    constructor(props){
      super(props)
      this.state = {
        authUser: null
      }
      //console.log(this.state.authUser);
      this.state.authUser = this.props.authUser;
      console.log(this.props);
    }
    componentWillReceiveProps(nextProps){
      this.setState({ authUser: nextProps.authUser });  


    }


    isAuthenticatedNavbar(){
      
      if (this.state.authUser != null){
        console.log("auth")
        const SignOut = compose(
          withRouter,
          withFirebase,
        )(SignOutButton);

        return (
          <div>
            <Menu.Item as={Link} to="/Upload" name="upload">
              <Button color="teal" fluid size='large' >Upload File</Button>
            </Menu.Item>
            <Menu.Item as={Link} to="/" name="signout">
              <SignOut/>
            </Menu.Item>
            </div>
        );
      }
      else {
        console.log("not auth")
        return (
          <span>
            <Menu.Item as={Link} to="/Login" name="login" >
                  Login
            </Menu.Item>
          
            <Menu.Item as={Link} to="/Register" name="register">
                  Register
            </Menu.Item>
          </span>
        );
      }
    }
    

    render(){
        return(
            <Menu>
              
            <Container>
              <Menu.Item as={Link} to={"/"}  header>
                  
                <Image
                  size="tiny"
                  src="https://cdn.vox-cdn.com/thumbor/wzk1QxKkWIJG1EXVUpF1SsFSnnM=/0x0:560x409/1400x1400/filters:focal(182x178:270x266):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/52662061/Screen_Shot_2017_01_09_at_11.30.26_AM.0.png"
                  
                />
              </Menu.Item>
              <Menu.Item as={Link} to={'/'} header>
                <h1>3d print</h1>
              </Menu.Item>
              <Menu.Menu position="right">
                {this.isAuthenticatedNavbar()}
              </Menu.Menu>
            </Container>
          </Menu>



        );
    }



}


export default NavBar;