import React, { Component } from 'react';
import {withFirebase} from '../Firebase&Database/'
import {withAuthentication} from '../Session/'
import NavBar from '../NavBar'
class Confirmation extends Component {
    constructor(props){
        super(props);
        this.state ={
            file:null
        }
        console.log(this.props);
    }

    componentDidMount(){
            this.props.firebase.addFile(this.props.file, this.props.authUser.uid);
    }



    render() {
        
        return (
            
            <div>
                
                <p>Uploaded</p>
            </div>
        );
    }
}

export default withFirebase(Confirmation);