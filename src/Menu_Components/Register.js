import React, {Component} from 'react';
import {
    Form,
    Message,
    Grid,
    Header,
    Image,
    Segment,
    Button
} from 'semantic-ui-react';
import NavBar from "../NavBar";
import Firebase, {FirebaseContext} from '../Firebase&Database/'

import {Redirect} from 'react-router-dom';
const INITIAL_STATE = {
    full_name: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: false,
  };

class Register extends Component{
    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
        console.log(props);
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

     handleSubmit = () => {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
          } = this.state;
      
         this.state.error = passwordOne !== passwordTwo ||
         passwordOne === '' ||
         email === '' ||
         username === '';
          
         this.props.firebase
         .doCreateUserWithEmailAndPassword(email, passwordOne)
             .then(authUser => {
                return this.props.firebase
                    .user(authUser.user.uid)
                     .set({
                        username,
                        email,
          });
        })
        .then(()=> {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push("/")
        })
           .catch(error => {
            console.log(error);
            this.setState({ error });
        });
               
         
     };
     
     
     
     render(){
         
         return(
            <div id="registration">    
                <NavBar/>
                
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column  style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/logo.png' /> Registration
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit} error={this.state.error}>
                        <Segment stacked>
                        <Form.Input fluid icon='user' name={'full_name'} iconPosition='left' placeholder="Full Name" onChange={this.handleChange}/>
                        <Form.Input fluid icon='mail outline' name={'email'} iconPosition='left' onChange={this.handleChange} placeholder='E-mail address' />
                        
                        <Form.Input
                            fluid
                            name={'passwordOne'}
                            icon='lock'
                            iconPosition='left'
                            onChange={this.handleChange}
                            placeholder='Password'
                            type='Password'
                        />
                        <Form.Input
                            fluid
                            name={'passwordTwo'}
                            icon='lock'
                            iconPosition='left'
                            onChange={this.handleChange}
                            placeholder='Confirm Password'
                            type='Password'
                        />
                        
                        <Button color='teal' type='submit' fluid size='large'>
                            Register
                        </Button>
                        <Message
                            error
                            header="Validation Error"
                            content="Email or password is invalid"/>
                        </Segment>
                    </Form>
                    
                    </Grid.Column>
                </Grid>
        </div>
        )


    }


} 


export default Register;