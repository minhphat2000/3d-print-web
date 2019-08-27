import * as THREE from 'three';
import React, { Component } from 'react';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
import {withRouter} from 'react-router-dom';
const OrbitControls = require('three-orbitcontrols');

class STLLoading extends Component {
    constructor(props){
        super(props)
        this.state = {
           file:this.props.file,
           obj:null
        }
    
        //this.url = this.props.firebase.getFile(this.props.uuid);
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this);
        this.scene = new THREE.Scene();
    }
    componentDidMount(){
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            90,
            width/height,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({antialias: true});
        
        var reader = new FileReader();
        var light = new THREE.AmbientLight( 0x404040 , 2);
        var file = this.state.file;
        var mesh;
        try{
				reader.addEventListener( 'load', function ( event ) {

            var contents = event.target.result;

            var geometry = new STLLoader().parse( contents );
            geometry.sourceType = "stl";
            geometry.sourceFile = file;

            var material = new THREE.MeshBasicMaterial({ color: '#FFFFFF' });

            mesh = new THREE.Mesh( geometry, material );
            mesh.name = "default";
            this.scene.add(mesh);
            mesh.position.set(0,0,7);
            camera.lookAt(mesh.position);
            this.scene.add(light);
            this.obj = mesh;
            this.start();
          }.bind(this), false );

          if ( reader.readAsBinaryString !== undefined ) {

            reader.readAsBinaryString( this.state.file );

          } else {

            reader.readAsArrayBuffer( this.state.file );

          }

        } catch (error){

          this.props.history.push('/Upload');
          
        }
        
        
        camera.position.z = 4;
        renderer.setClearColor('#000000');
        renderer.setSize(width, height);
        this.camera = camera;
        this.renderer = renderer;
        this.mount.appendChild(this.renderer.domElement);
        
        this.start = this.start.bind(this);
         this.controls = new OrbitControls(camera,this.renderer.domElement);
        
        var gridXZ = new THREE.GridHelper(150, 20,0xff0000, 0xffffff);
        
        this.scene.add(gridXZ);

    }
    componentWillUnmount() {
        this.stop()
        try {
          this.mount.removeChild(this.renderer.domElement)
        } catch (error) {
          
        }
        
      }

    start() {
        this.controls.enableZoom = true;
        console.log(this);
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
      }

      stop() {
        cancelAnimationFrame(this.frameId)
      }


      animate() {
         
        this.controls.update();
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
      }


      renderScene() {
        this.renderer.render(this.scene, this.camera)
      }

    render() {
        return (
          <div
            style={{ width: '800px', height: '800px' }}
            ref={(mount) => { this.mount = mount }}
          />
        )
      }



}
    

export default withRouter(STLLoading);