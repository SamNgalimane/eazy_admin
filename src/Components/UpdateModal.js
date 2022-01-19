import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap'; 
import "../Styles/Modal.css"; 
import axios from 'axios';
  
class ModalPopup extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModal: false, 
            isButtonActive: false,
            division: "",
            ledSplit: "",
            divisionalHead: "",
            e4BusinessPartner: "",
            plantRelevant: "",
            planningContact: "",
            comment: "",
            contractID: ""
        };
        //this.baseState = this.state;        
    }  
    
    componentDidMount() {
        return (
            this.setState({division: this.props.data.length !== 0 || undefined ? this.props.data[0].division : ""}),
            this.setState({ledSplit: this.props.data.length !== 0 || undefined ? this.props.data[0].ledSplit : "",}),
            this.setState({divisionalHead: this.props.data.length !== 0 || undefined ? this.props.data[0].divisionalHead : ""}),
            this.setState({e4BusinessPartner: this.props.data.length !== 0 || undefined ? this.props.data[0].e4BusinessPartner : ""}),
            this.setState({plantRelevant: this.props.data.length !== 0 || undefined ? this.props.data[0].plantRelevant : ""}),
            this.setState({planningContact:this.props.data.length !== 0 || undefined ? this.props.data[0].planningContact : ""}),
            this.setState({comment: this.props.data.length !== 0 || undefined ? this.props.data[0].comment : ""}),
            this.setState({contractID: this.props.data.length !== 0 || undefined ? this.props.data[0].contractCaptureDataID : ""}),
            console.log("State set")
        );
    }0
  
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModal: status });  
    }  
  
    handleClose = () => {  
        //this.setState(this.baseState)
        this.props.onPopupClose(false);  
    } 
     
    handleSave = () => {
        let values = [this.state.division, this.state.divisionalHead, this.state.e4BusinessPartner, this.state.plantRelevant, this.state.planningContact, this.state.comment]
        console.log("values", values);
        axios.get(`https://dskapi.azurewebsites.net/api/GetAllContractCaputredData/${this.state.contractID}`, {
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

    render() {
        console.log("The data passed to the modal: ", this.props.data)
        console.log("State of 'division' variable: ", this.state.division)
        return (  
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose}  
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
                                    <input id="Divison" className="input" type="input" 
                                    onChange={(e) => {
                                        this.setState({division: e.target.value})
                                        this.setState({isButtonActive: true})
                                    }} value={this.state.division}/>
                                </div>
                                
                                <div className="col-md-4">
                                    <label htmlFor="LED-Split">LED Split</label>
                                    <input className="input" id="LED-Split" type="text" 
                                    onChange={(e) => {
                                        this.setState({ledSplit: e.target.value})
                                        this.setState({isButtonActive: true})  
                                    }} value={this.state.ledSplit}/>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="Divisional-Head">Divisional Head</label>
                                    <input className="input" id="Divisional-Head" type="text" 
                                    onChange={(e) => {
                                        this.setState({divisionalHead: e.target.value})
                                        this.setState({isButtonActive: true})
                                    }} value={this.state.divisionalHead}/>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="E4Business-Partner">E4Business Partner</label>
                                    <input className="input" id="E4Business-Partner" type="text"
                                    onChange={(e) => {
                                        this.setState({e4BusinessPartner: e.target.value})
                                        this.setState({isButtonActive: true})    
                                    }} value={this.state.e4BusinessPartner} />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="Plant-Relevant">Plant Relevant</label>
                                    <div className="input" style={{border: "none"}}>
                                        <input type="radio" value="Yes" id="Yes"
                                        onChange={(e) => {
                                            this.setState({plantRelevant: e.target.value})
                                            this.setState({isButtonActive: true})    
                                        }} name="Plant-Relevant" />Yes
                                        
                                        <input style={{padding: "15px"}} type="radio" value="No" id="No"
                                        onChange={(e) => {
                                            this.setState({plantRelevant: e.target.value})
                                            this.setState({isButtonActive: true})    
                                        }} name="Plant-Relevant" />No
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="Planning-Contact">Planning Contact</label>
                                    <input className="input" id="Planning-Contact" type="text"
                                    onChange={(e) => {
                                        this.setState({planningContact: e.target.value})
                                        this.setState({isButtonActive: true})    
                                    }} value={this.state.planningContact}/>
                                </div>
                                
                                <div className="col-md-4">
                                    <label htmlFor="Comment">Comment</label>
                                    <textarea className="input" id="Comment" type="text" 
                                    onChange={(e) => {
                                        this.setState({comment: e.target.value})
                                        this.setState({isButtonActive: true})
                                    }} value={this.state.comment}>
                                        {this.state.comment}
                                    </textarea>
                                </div>
                            </div>
                            <div style={{marginLeft: "500px"}}>
                                <button type="button" style={{padding: "5px", margin: 20, borderRadius: 5}} className="link-button" onClick={() => this.isShowModal(true)}> Close</button>
                                <button type="button" style={{padding: 5, margin: 20, borderRadius: 5}} className="link-button" disabled={this.state.isButtonActive} onClick={this.handleSave} > Save</button>
                                {console.log("Is Button Active: ", this.state.isButtonActive)}
                            </div>
                        </div>    
                    </Modal.Body>  
                </Modal >  
            </Fragment >  
            
        );
    }  
}  
  
export default (ModalPopup);