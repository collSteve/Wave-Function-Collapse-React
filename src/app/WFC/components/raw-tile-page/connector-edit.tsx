import React from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Console } from "console";

interface ConnectorEditComponentProps {
    connectorName:string;
    label?:string;
    currentConnection:string;
    onEdit:(a:string[])=>void
} 

interface ConnectorEditComponentState {
    connectorInputValue:string;
    editOn:boolean;
} 

export default class ConnectorEditComponent extends React.Component<ConnectorEditComponentProps, ConnectorEditComponentState> {

    constructor(props:ConnectorEditComponentProps) {
        super(props);

        this.state = {
            connectorInputValue: "",
            editOn: false
        }
    }


    render(): React.ReactNode {
        return (
            <div>

                <p>Current {this.props.connectorName} Connector: {this.props.currentConnection}</p>


                {this.state.editOn ? (
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <TextField
                            style={{width:"80%", alignSelf: "center"}}
                            id="standard-disabled"
                            type="text"
                            label={this.props.label}
                            variant="outlined"
                            value={this.state.connectorInputValue} onChange={(e)=>{this.setState({connectorInputValue:e.target.value})}}
                            />
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                            <Button variant="contained" color="warning" onClick={()=>this.setState({editOn:false})}>Collapse</Button>
                            <Button variant="contained" onClick={()=>{
                                // console.log(this.state.connectorInputValue);
                                const connectors = this.state.connectorInputValue.split(",")
                                this.props.onEdit(connectors); 
                                this.setState({editOn:false})}}>change</Button>

                        </div>        
                    </div>
                ): (<Button variant="contained" onClick={()=>this.setState({editOn:true})}>Edit</Button>)} 
                
            </div>
        );
    }
}