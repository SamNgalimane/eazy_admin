import React from 'react';
import "../Styles/Table.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Table extends React.Component {
    
    constructor(props){
      super(props);
      this.getHeader = this.getHeader.bind(this);
      this.getRowsData = this.getRowsData.bind(this);
      this.getKeys = this.getKeys.bind(this);
    }
    
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
        return <tr key={index +""+ this.props.data.id}><RenderRow key={index} data={row} keys={keys}/><td><button value={this.props.data.id}>Edit</button></td></tr>
      })
    }
    
    render() {
        return (
          <>
            <h1>Contracts.</h1>
            <div className="tbl-header">
              <table style={{cellpadding:"0", cellspacing:"0", border:"0"}}>
                <thead>
                    <tr>{this.getHeader()}<th>Edit</th></tr>
                </thead>
                <tbody className="tbl-content">
                  {this.getRowsData()}
                </tbody>
              </table>
            </div>
          </>
        );
    }
}

const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    return <td key={props.data[key] +""+ index}>{props.data[key]}</td>
  })
}