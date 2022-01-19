import React from "react";
import ContractTable from '../Components/ContractTable';
import axios from "axios";
import ProgressBar from "../Components/ProgressBar";

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
        this.setState({contracts: response.data})
    });
  }

  render() {
    if(this.state.contracts.length !== 0) {
      return (
        <div>
          <ContractTable data={this.state.contracts} />
        </div>
      );
    }
    else {
      return(
        <div
          style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
          }} >
          <ProgressBar loading={true}/>
        </div>
      );
    }
  }
}