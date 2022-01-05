import React from 'react';
import { Fragment } from 'react';  
import ModalPopup from '../Components/UpdateModal';
import "../Styles/Table.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Table extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {  
        showModalPopup: false,
        dataToPass: []
      } 
      // set the value to be passed as 'this' param to the tagert function
      this.getHeader = this.getHeader.bind(this); 
      this.getRowsData = this.getRowsData.bind(this);
      this.getKeys = this.getKeys.bind(this);
    }

    dataForUpdate = (idToLookFor) => {
      var dataToUpdate = this.props.data;
      let data = {...this.state.dataToPass};
      for (var i = 0; i < dataToUpdate.length; i++) {
          if (dataToUpdate[i].contractCaptureDataID == idToLookFor) {
            data = dataToUpdate[i];
            this.state.dataToPass = data;
            this.isShowPopup(true);
            break;
          }
      }
    };

    isShowPopup = (status) => {  
      this.setState({ showModalPopup: status });  
    };   

    getKeys = function(){
      return Object.keys(this.props.data[0]);
    }
    
    getHeader = function(){
      var keys = this.getKeys();
      return keys.map((key, index)=>{
        return <th key={key +""+ this.props.data.id}>{key.toUpperCase()}</th>
      })
    }
    
    getRowsData = function(){
      var items = this.props.data;
      var keys = this.getKeys();
      return items.map((row, index)=>{
        return(
            <tr onClick={(e) => this.dataForUpdate(row['contractCaptureDataID'])} key={index +""+ this.props.data.contractDataID} >
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
            <ModalPopup  
              data={this.state.dataToPass}
              showModalPopup={this.state.showModalPopup}  
              onPopupClose={this.isShowPopup}>
              </ModalPopup> 
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