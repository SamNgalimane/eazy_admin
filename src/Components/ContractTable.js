import React from 'react';
import { Fragment } from 'react';  
import ModalPopup from './UpdateModal';
import "../Styles/Table.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default class ContractTable extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {  
        showModalPopup: false,
        data: props.data,
        dataToPass: [], // Filtered data that will be sent to the update-contract modal
        tableData: props.data, // The Contract-Master-Data
        captureData: [], // Contains all the objects of Contract-Master-Data API Array.
        loaded: false
      }            

      // set the value to be passed as 'this' param to the tagert function
      this.getKeys = this.getKeys.bind(this);
      this.getHeader = this.getHeader.bind(this);
      this.getCapturedData = this.getCapturedData.bind(this); 
      this.getRowsData = this.getRowsData.bind(this);
      this.getContractData = this.getContractData.bind(this);
      this.dataForUpdate = this.dataForUpdate.bind(this);
      this.showPopup = this.showPopup.bind(this);

      this.getCapturedData();
    }

    getCapturedData = () => {
      for(let element of this.props.data){ //Gets all objects of the Contract-Master-Data Array
        this.state.captureData.push(element.captureData[0].contractCaptureDataID)
      }
    }

    getContractData = (id) => {
      axios.get(`https://dskapi.azurewebsites.net/api/GetContractCapturedDataById?ID=${id}`)
      .then( response => {
        this.setState({dataToPass: response.data});
      });
    };

    // Gets the values of properties of an object of Get-Contract-Captured-Data-By-Id API
    // This the 'CaptureData' key from one of the objects in 
    // the Get-All-Contract-Caputred-Data API array. This is determided by
    // passing a 'contractDataID' which correlate with a 
    dataForUpdate = (idToLookFor) => {
      console.log("Contact Captured Id for update: ", idToLookFor);
      this.getContractData(idToLookFor);
      if(this.state.dataToPass){
        this.showPopup();
      }
    };

    showPopup = () => {
      this.isShowPopup(true);
    }

    isShowPopup = (status) => {  
      this.setState({ showModalPopup: status });  
    };   

    getKeys = function(){
      let keys = Object.keys(this.props.data[0]);
      for( var i = 0; i < keys.length; i++){ 
        if ( keys[i] === 'captureData' || keys[i] === '') { 
            keys.splice(i, 1); 
        }
      }
      return keys;
    }
    
    getHeader = function(){
      var keys = this.getKeys();
      return keys.map((key, index)=>{
        return <th key={key +""+ this.props.data.id}>{key.toUpperCase()}</th>
      })
    }
    
    getRowsData = function(){
      var keys = this.getKeys();
      return this.props.data.map((row, index)=>{
        return(
            <tr onClick={(e) => { this.dataForUpdate(this.state.captureData[index]);}} 
            key={index +""+ this.state.data.contractDataID} >
              <RenderRow key={index} data={row} keys={keys}/>
            </tr>
          )
      })
    }
    
    render() {
      
        return (
          <>
            <Fragment>
              <header align="center">  
                <Fragment>  
                  <h1>Contracts.</h1>
                  <div className="tbl-header">
                    <table style={{cellpadding:"0", cellspacing:"0", border:"0"}}>
                      <thead>
                          <tr>{this.getHeader()}</tr>
                      </thead>
                      <tbody className="tbl-content">
                        {this.getRowsData()}
                      </tbody>
                    </table>
                  </div>  
                </Fragment>  
              </header> 
              {this.state.dataToPass.length !== 0 ? <ModalPopup  
                data={this.state.dataToPass}
                showModalPopup={this.state.showModalPopup}  
                onPopupClose={this.isShowPopup}>
              </ModalPopup> : null}
            </Fragment>
          </>
        );
    }
}

const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    return <td key={props.data[key] +""+ index}>{props.data[key]}</td>
  })
}