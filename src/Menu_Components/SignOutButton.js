import React, { Component } from 'react';
import {
    Button
} from 'semantic-ui-react';
class SignOutButton extends Component {
    constructor(props){
        super(props);
        console.log(props)
    }
    handleSignOut = (e) =>{
        
        this.props.firebase.doSignOut();
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <Button color="teal" fluid size='large' onClick={this.handleSignOut}>Sign Out</Button>
            </div>
        );
    }
}

export default SignOutButton;