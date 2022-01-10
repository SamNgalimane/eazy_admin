import React from "react";
import Table from '../Components/Table';
import axios from "axios";
import ProgressBar from "../Components/ProgressBar";

export default class ContractData extends React.Component {
  constructor(props){
      super(props);
      this.state={
          contracts: [],
          capturedContractData: []
      };
  }

  componentDidMount() {
    axios.get("https://dskapi.azurewebsites.net/api/GetContractMasterDatas")
    .then( response => {
        this.setState({contracts: response.data})
    });

    axios.get("https://dskapi.azurewebsites.net/api/GetAllContractCaputredData")
    .then( response => {
        this.setState({capturedContractData: response.data})
    });
  }

  render() {
    if(this.state.contracts.length !== 0 && this.state.capturedContractData.length !== 0) {
      return (
        <div>
          <Table data={this.state.contracts} contractData={this.state.capturedContractData}/>
        </div>
      );
    }
    else {
      return(
        <div
          style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
          }}
          >
          <ProgressBar loading={true}/>
        </div>
      );
    }
  }
}