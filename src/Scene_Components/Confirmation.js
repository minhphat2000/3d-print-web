import React, { Component } from 'react';
import {withFirebase} from '../Firebase&Database/'
import {withAuthentication} from '../Session/'
import NavBar from '../NavBar'
import STLLoading from './STLLoading'
import {withRouter} from 'react-router-dom';



class Confirmation extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            file:null
        }
        console.log(this.props);
        if (this.props.authUser == null){
            this.props.history.push('/Upload');
        }
    }

    componentDidMount(){
       
        if (this.props.authUser == null){
            this.props.history.push('/Upload');
        }

            this.download_url = this.props.firebase.addFile(this.props.file, this.props.authUser.uid);
    }



    render() {
        
        return (
            
            <div>
                <STLLoading download_url={this.download_url}/>
                <p>Uploaded</p>
            </div>
        );
    }
}

export default withRouter(withFirebase(Confirmation));