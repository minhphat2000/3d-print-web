import * as THREE from 'three';


import React, { Component } from 'react';

class STLLoading extends Component {
    constructor(props){
        super(props)
        this.state = {
            uuid : this.props.uuid
        }
    
        this.loader = new THREE.STLLoader();
    }



}
    

export default STLLoading;