import React, { Component } from 'react';
import {withFirebase} from '../Firebase&Database/'
import {withAuthentication} from '../Session/'
import NavBar from '../NavBar'
import STLLoading from './STLLoading'
import {withRouter} from 'react-router-dom';
import {
    Grid, Button
} from 'semantic-ui-react';


class Confirmation extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            file:this.props.file,
            download_url:null
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
        else{
            var state; 
            this.props.firebase.addFile(this.props.file, this.props.authUser.uid, (url) => {
                this.setState({
                    download_url:url
                });  
            
            });
            
            
           
            
            
        }

        
            
    }

    handleClick = (e) => {
        console.log(this.state.download_url);
        this.props.history.push('/Upload/Choose/');
    }

    render() {
        
        return (
            
            <div>
                <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 800 }}>
                <STLLoading file={this.state.file}/>
                <Button color="teal" fluid size='large' onClick={this.handleClick}>Confirm</Button>
                </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default withRouter(withFirebase(Confirmation));