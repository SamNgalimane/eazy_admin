import React from "react";
import Table from '../Components/Table';
import axios from "axios";

export default class ContractData extends React.Component {
    constructor(props){
        super(props);
        this.state={
           contracts: []
        };
    }

    componentDidMount() {
      axios.get("https://dskapi.azurewebsites.net/api/GetContractMasterDatas")
      .then( response => {
          this.setState({contracts:response.data})
      });
    }

    render() {
      if(this.state.contracts.length != 0) {
        return (
          <div>
            <Table data={this.state.contracts}/>
          </div>
        );
      }
      else {
        return(
          <div><h1>{this.state.contracts}</h1></div>
        );
      }
    }
  
  }