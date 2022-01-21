import React, { useState, Fragment } from "react";
import "../Styles/Table.css"
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default class SupplierTable extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {  
        showModalPopup: false,
        dataToPass: [],
        tableData: props.data,
        captureData: []
      } 
      // set the value to be passed as 'this' param to the tagert function
      this.getHeader = this.getHeader.bind(this); 
      this.getRowsData = this.getRowsData.bind(this);
      this.getKeys = this.getKeys.bind(this);
      this.getSupplierData = this.getSupplierData.bind(this);
      this.getCapturedData = this.getCapturedData.bind(this);

      this.getCapturedData();  
    }

    
    /* Gets value of 'captureData' key in each object of
      the captureData array.
    */
    getCapturedData = () => {
      for(let element of this.props.data){ //Gets all objects of the Contract-Master-Data Array
        this.state.captureData.push(element.captureData[0].supplierCaptureDataID)
        console.log(element.captureData[0].supplierCaptureDataID)
      }
    }

    // Gets contract captured data with given id
    getSupplierData = (id) => {
      axios.get(`/GetSupplierCapturedDataById?ID=${id}`)
      .then( response => {
        this.setState({dataToPass: response.data});
      });
    };

    dataForUpdate = (idToLookFor) => {
      this.getSupplierData(idToLookFor);
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
      console.log(keys)
      // Remove the 'captureData' key in the keys array
      for( var i = 0; i < keys.length; i++){ 
        if ( keys[i] === 'captureData' || keys[i] === 'supplierDataID') { 
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
      var items = this.props.data;
      var keys = this.getKeys();
      return items.map((row, index)=>{
        return(
            <tr onClick={(e) => this.dataForUpdate(this.state.captureData[index])} key={index +""+ this.props.data.contractDataID} >
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
                <h1>Supplier Master Data</h1>
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

const ModalPopup = (props) => {
  const[showModal, setShowModal] = useState(false);
  const[isButtonActive, setButtonState] = useState(false);
  const[buyerComment, setBuyerComment] = useState(props.data[0].buyerComment);
  const[certusYear, setCertusYear] = useState(props.data[0].certusYear);
  const[blackDesignatedGroupSupplier, setGroupSupplier] = useState(props.data[0].blackDesignatedGroupSupplier);
  const[supplierCaptureDataID] = useState(props.data[0].supplierCaptureDataID);
   
  /*
  useEffect(() => {
      setDivision(props.data[0].division);
  }, [division])
  */

  const isShowModal = (status) => {  
      handleClose();  
      setShowModal(status);  
  }

  const handleClose = () => {  
      props.onPopupClose(false);  
  } 

  const handleSave = () => {
      let values = [buyerComment, certusYear, 
        blackDesignatedGroupSupplier]
      console.log("values", values);
      axios.get(`https://dskapi.azurewebsites.net/api/PutSupplierCapturedData/${supplierCaptureDataID}`, {
          method: 'PUT',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
         }).then((result) => {
          result.json().then((resp) => {
           console.log(resp)
          })
      })
  }

  return (  
      <Fragment>  
          {console.log("The data passed to the modal: ", props.data)}
          <Modal show={props.showModalPopup} onHide={handleClose}  
              size="lg"  
              aria-labelledby="contained-modal-title-vcenter"  
              centered>  
              <Modal.Header closeButton>  
                  <Modal.Title id="sign-in-title">  
                      Edit Data  
                  </Modal.Title>  
              </Modal.Header>  
              <Modal.Body>
                  <div className="edit">
                      <div className="row">
                          <div className="col-md-4">
                              <label htmlFor="certus-Year">certus Year</label>
                              <input id="certus-Year" className="input" type="text" 
                              onChange={(e) => {
                                  setCertusYear(e.target.value)
                                  setButtonState(true)
                              }} value={certusYear}/>
                          </div>
                          <div className="col-md-4">
                              <label htmlFor="black-Designated-Group-Supplier">Black Designated Group Supplier</label>
                              <input className="input" id="black-Designated-Group-Supplier" type="text" 
                              onChange={(e) => {
                                  setGroupSupplier(e.target.value)
                                  setButtonState(true)  
                              }} value={blackDesignatedGroupSupplier}/>
                          </div>
                          
                          <div className="col-md-4">
                              <label htmlFor="buyer-Comment">Buyer Comment</label>
                              <textarea className="input" id="buyerComment" type="text" 
                              onChange={(e) => {
                                  setBuyerComment(e.target.value)
                                  setButtonState(true)
                              }} value={buyerComment}>
                                  {buyerComment}
                              </textarea>
                          </div>
                      </div>
                      <div style={{marginLeft: "500px"}}>
                          <button type="button" style={{padding: "5px", margin: 20, borderRadius: 5}} className="link-button" onClick={() => isShowModal(showModal)}> Close</button>
                          <button type="button" style={{padding: 5, margin: 20, borderRadius: 5}} className="link-button" disabled={!isButtonActive} onClick={handleSave} > Save</button>
                      </div>
                  </div>    
              </Modal.Body>  
          </Modal >  
      </Fragment >  
  );
}