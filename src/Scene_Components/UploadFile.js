import React, { Component } from 'react';
import {
    Form,
    Button,
    Label,
    Grid,
    GridColumn,
    Segment,
    Message
} from 'semantic-ui-react';
import Confirmation from './Confirmation'
import NavBar from '../NavBar';
import {Switch, Route, withRouter} from 'react-router-dom';
import Dropzone from 'react-dropzone';
class UploadFile extends Component {
    constructor(props){
        super(props);
        this.state={
            file:null,
            error:null
        }
        
    }
    
    componentWillReceiveProps(){
        this.setState({file: this.props.file, error:this.props.error});
    }


    render() {
        return (
            <div>
                
                <NavBar authUser={true}/>
               <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' padded>
                
                <Grid.Column  style={{ maxWidth: 500 }}>
                
               
                <Segment size='big' stacked>
                   <Dropzone accept=".stl" onDrop={this.props.onChangeFile}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Message color="teal" size='huge'>
                                <Message.Header>Drag and Drop .STL File or Click Here to Select From Computer</Message.Header>

                                </Message>
                            </div>
                            </section>
                        )}
                    </Dropzone>
                </Segment>
                
                </Grid.Column>
                </Grid>

              

            </div>
        );
    }

     
    handleSubmit(){
       

    }
}









export default withRouter(UploadFile);