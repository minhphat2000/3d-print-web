import React, { Component } from 'react';
import {withFirebase} from '../Firebase&Database/'
class Choose_Provider extends Component {
    constructor(props){
        super(props);
        this.state = {
            file_uid:this.props.uid
        };
        this.getProviders.bind(this);
    }
    componentDidMount(){
        this.getProviders();
    }
    getProviders(){
        this.props.firebase.getChildrenKeys("",10,(arr)=>{
            console.log(arr);
        });
    }
    
    
    
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default withFirebase(Choose_Provider);