import React, {Component} from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import NavBar from "../NavBar";
const INITIAL_STATE = {
  email:'',
  password:'',
  error: ''

}


class Login extends Component{
  constructor(props){
    super(props);
    this.state = INITIAL_STATE;
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value});
  handleSubmit = () => {
    this.props.firebase
    .doSignInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.setState({ ...INITIAL_STATE });
      this.props.history.push("/");
    })
    .catch(error => {
      console.log(error)
      this.setState({ error });
    });

  
};


render(){

return (
<div id="parent">    
<NavBar/>
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png' /> Log-in to your account
      </Header>
      <Form size='large' onSubmit={this.handleSubmit} error={this.state.error}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' name="email" placeholder='E-mail address' onChange={this.handleChange}/>
          <Form.Input
            fluid
            icon='lock'
            name="password"
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handleChange}
          />

          <Button color='teal' type="submit" fluid size='large'>
            Login
          </Button>

          <Message
              error
              header="Validation Error"
              content={this.state.error.message}/>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/Register'>Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
</div>
)
}
}
export default Login
