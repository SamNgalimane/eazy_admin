import React, { useState, Fragment } from "react";
import { Modal } from 'react-bootstrap';
import "../Styles/Table.css"
import "../Styles/Modal.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export default class ContractTable extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {  
        showModalPopup: false,
        data: props.data, // The Contract-Master-Data
        dataToPass: [], // Filtered data that will be sent to the update-contract modal
        tableData: props.data, // The Contract-Master-Data that will be displayed
        captureData: [], // Contains all the objects of Contract-Master-Data API Array.
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

    /* Gets value of 'captureData' key in each object of
        the captureData array.
      */
    getCapturedData = () => {
      for(let element of this.props.data){ //Gets all objects of the Contract-Master-Data Array
        this.state.captureData.push(element.captureData[0].contractCaptureDataID)
      }
    }

    // Gets contract captured data with given id
    getContractData = (id) => {
      axios.get(`https://dskapi.azurewebsites.net/api/GetContractCapturedDataById?ID=${id}`)
      .then( response => {
        this.setState({dataToPass: response.data});
      });
    };

    /* Gets object of the Get-Contract-Captured-Data-By-Id API
     * and display a modal that will be used to update the object data
    */
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

    /**
     * Get the keys of the data array
     * The keys will be used as table headings
     * @returns keys
     */
    getKeys = function(){
      let keys = Object.keys(this.props.data[0]);
      // Remove the 'captureData' key in the keys array
      for( var i = 0; i < keys.length; i++){ 
        if ( keys[i] === 'captureData' || keys[i] === 'contractDataID') { 
            keys.splice(i, 1); 
        }
      }
      return keys;
    }
    
    /**
     * Map the keys to table headings
     * @returns <th></th>
     */
    getHeader = function(){
      var keys = this.getKeys();
      return keys.map((key, index)=>{
        return <th key={key +""+ this.props.data.id}>{key.toUpperCase()}</th>
      })
    }
    
    /**
     * Return table rows with data and a click capability
     * Each row passes a unique contractCaptureDataID to
     * the methods that ensured the data that will be updated 
     * is available.
     * @returns <tr></tr>
     */
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
                  <h1>Contract Master Data</h1>
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
  const[division, setDivision] = useState(props.data[0].division);
  const[ledSplit, setLedSplit] = useState(props.data[0].ledSplit);
  const[divisionalHead, setDivisionalHead] = useState(props.data[0].divisionalHead);
  const[e4BusinessPartner, setE4BusnPartner] = useState(props.data[0].e4BusinessPartner);
  const[plantRelevant, setPlantRelevance] = useState(props.data[0].plantRelevant);
  const[planningContact, setPlanngContact] = useState(props.data[0].planningContact);
  const[comment, setComment] = useState(props.data[0].comment);
  const[contractCaptureDataID] = useState(props.data[0].contractCaptureDataID);
   
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
      let values = [division, divisionalHead, 
          e4BusinessPartner, plantRelevant, planningContact, comment]
      console.log("values", values);
      axios.get(`https://dskapi.azurewebsites.net/api/GetAllContractCaputredData/${contractCaptureDataID}`, {
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
                              <label htmlFor="Division">Division</label>
                              <input id="Divison" className="input" type="text" 
                              onChange={(e) => {
                                  setDivision(e.target.value)
                                  setButtonState(true)
                              }} value={division}/>
                          </div>
                          <div className="col-md-4">
                              <label htmlFor="LED-Split">LED Split</label>
                              <input className="input" id="LED-Split" type="text" 
                              onChange={(e) => {
                                  setLedSplit(e.target.value)
                                  setButtonState(true)  
                              }} value={ledSplit}/>
                          </div>

                          <div className="col-md-4">
                              <label htmlFor="Divisional-Head">Divisional Head</label>
                              <input className="input" id="Divisional-Head" type="text" 
                              onChange={(e) => {
                                  setDivisionalHead(e.target.value)
                                  setButtonState(true)
                              }} value={divisionalHead}/>
                          </div>

                          <div className="col-md-4">
                              <label htmlFor="E4Business-Partner">E4Business Partner</label>
                              <input className="input" id="E4Business-Partner" type="text"
                              onChange={(e) => {
                                  setE4BusnPartner(e.target.value)
                                  setButtonState(true)    
                              }} value={e4BusinessPartner} />
                          </div>

                          <div className="col-md-4">
                              <label htmlFor="Plant-Relevant">Plant Relevant</label>
                              <div className="input" style={{border: "none"}}>
                                  <input type="radio" value="Yes" id="Yes"
                                  onChange={(e) => {
                                      setPlantRelevance(e.target.value)
                                      setButtonState(true)    
                                  }} name="Plant-Relevant" />Yes
                                  
                                  <input style={{padding: "15px"}} type="radio" value="No" id="No"
                                  onChange={(e) => {
                                      setPlantRelevance(e.target.value)
                                      setButtonState(true)
                                  }} name="Plant-Relevant" />No
                              </div>
                          </div>

                          <div className="col-md-4">
                              <label htmlFor="Planning-Contact">Planning Contact</label>
                              <input className="input" id="Planning-Contact" type="text"
                              onChange={(e) => {
                                  setPlanngContact(e.target.value)
                                  setButtonState(true)    
                              }} value={planningContact}/>
                          </div>
                          
                          <div className="col-md-4">
                              <label htmlFor="Comment">Comment</label>
                              <textarea className="input" id="Comment" type="text" 
                              onChange={(e) => {
                                  setComment(e.target.value)
                                  setButtonState(true)
                              }} value={comment}>
                                  {comment}
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