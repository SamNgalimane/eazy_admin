import React from "react";
import contractData from "../API/ContractData.json";
import Table from '../Components/Table';

export default class ContractData extends React.Component {
    constructor(props){
        super(props);
        this.state={
           contractData
        }
    }
    render() {
        return (
          <div>
            <Table data={this.state.contractData}/>
          </div>
          
        );
    }
  
  }