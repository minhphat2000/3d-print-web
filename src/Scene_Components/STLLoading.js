import * as THREE from 'three';
import React, { Component } from 'react';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
class STLLoading extends Component {
    constructor(props){
        super(props)
        this.state = {
           
        }
    
        //this.url = this.props.firebase.getFile(this.props.uuid);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this);
        this.scene = new THREE.Scene();
    }
    componentDidMount(){
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width/height,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({antialias: true});
        
        var mesh;
        console.log("in")
        const loader = new STLLoader();
        loader.load('./Body_Plain.STL',function(geometry){
            var material = new THREE.MeshBasicMaterial({color: '#433F81'})
            this.material = material;
            mesh = new THREE.Mesh(geometry, material);
            console.log(mesh);
            this.scene.add(mesh);

        },undefined, function(e){
          console.error(e);
        } );
        this.obj = mesh;
        camera.position.z = 4;
        renderer.setClearColor('#000000');
        renderer.setSize(width, height);
        this.camera = camera;
        this.renderer = renderer;
        this.mount.appendChild(this.renderer.domElement);
        this.start();


    }
    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
      }

    start() {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
      }

      stop() {
        cancelAnimationFrame(this.frameId)
      }


      animate() {
          console.log(this);
        this.obj.rotation.x += 0.01
        this.obj.rotation.y += 0.01
    
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
      }


      renderScene() {
        this.renderer.render(this.scene, this.camera)
      }

    render() {
        return (
          <div
            style={{ width: '400px', height: '400px' }}
            ref={(mount) => { this.mount = mount }}
          />
        )
      }



}
    

export default STLLoading;