import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap'; 
import "../Styles/Modal.css"; 
  
class ModalPopup extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModal: false  
        };  
    }  
  
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModal: status });  
    }  
  
    handleClose = () => {  
        this.props.onPopupClose(false);  
    } 

    handleChange = () => {

    }
  
    render() { 
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
                                    <label htmlFor="Contract-Data-ID">Contract Data ID</label>
                                    <input className="input" id="Contract-Data-ID" type="text" 
                                    onChange={this.handleChange} value={this.props.data.ContractDataID}/>
                                </div>
                                
                                <div className="col-md-4">
                                    <label htmlFor="Plant-Relevant">Plant Relevant</label>
                                    <div className="input">
                                        <input type="radio" value="Yes" id="Yes"
                                        onChange={this.handleChange} name="Plant-Relevant" />Yes
                                        
                                        <input style={{paddingLeft: "5px"}} type="radio" value="No" id="No"
                                        onChange={this.handleChange} name="Plant-Relevant" />No
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <label htmlFor="Division">Division</label>
                                    <input id="Divison" className="input" type="input" 
                                    onChange={this.handleChange} value={this.props.data.Division}/>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="Divisional-Head">Divisional Head</label>
                                    <input className="input" id="Divisional-Head" type="text" 
                                    onChange={this.handleChange} value={this.props.data.DivisionalHead}/>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="E4Business-Partner">E4Business Partner</label>
                                    <input className="input" id="E4Business-Partner" type="text"
                                    onChange={this.handleChange} value={this.props.data.E4BusinessPartner} />
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="Planning-Contact">Planning Contact</label>
                                    <input className="input" id="Planning-Contact" type="text"
                                    onChange={this.handleChange} value={this.props.data.PlanningContact}/>
                                </div>
                                
                                <div className="col-md-4">
                                    <label htmlFor="Comment">Comment</label>
                                    <textarea className="input" id="Comment" type="text" 
                                    onChange={this.handleChange} value={this.props.data.Comment}>
                                        {this.props.data.Comment}
                                    </textarea>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="Classification">Classification</label>
                                    <div className="input">
                                        <input type="radio" value="A" id="A"
                                        onChange={this.handleChange} name="Classification" />A
                                        
                                        <input style={{paddingLeft: "5px"}} type="radio" value="B" id="B"
                                        onChange={this.handleChange} name="Classification" />B
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="Scope">Scope</label>
                                    <input className="input" id="Scope" type="date"
                                    onChange={this.handleChange} value={this.props.data.Scope}/>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="LED-Split">LED Split</label>
                                    <div className="input">
                                        <select id="LED-Split" style={{border: "none", width: 200}} 
                                        onChange={this.handleChange} type="text">
                                            <option>MBSA</option>
                                            <option>DTBSA</option>  
                                            <option>MBFS</option>  
                                            <option>Trucks</option>  
                                            <option>Vans</option>  
                                            <option>SMH</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginLeft: "500px"}}>
                                <button type="button" style={{padding: "5px", margin: 20, borderRadius: 5}} className="link-button" onClick={() => this.isShowModal(true)}> Close</button>
                                <button type="button" style={{padding: 5, margin: 20, borderRadius: 5}} className="link-button" > Save</button>
                            </div>
                        </div>    
                    </Modal.Body>  
                </Modal >  
            </Fragment >  
        );  
    }  
}  
  
export default (ModalPopup);