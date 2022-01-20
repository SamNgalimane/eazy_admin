import React, { useState} from "react";
import SupplierTable from '../Components/SupplierTable';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
//import ProgressBar from "../Components/ProgressBar";

const SupplierData = () =>{

  const [supplier, setSupplier] = useState([]);
  const[month, setMonth] = useState("");
  const[year, setYear] = useState("");
  
  const load = async () => {

      let data = JSON.stringify({
        "month": month,
        "year": year
      });
    
      var config = {
        method: 'POST',
        url: 'https://dskapi.azurewebsites.net/api/GetSupplierMasterDatas',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'content-Type': 'application/json'
      },
      data : data
    };
    
    try{
      const data = await axios(config);
      setSupplier(data)
      console.log(data)
    } catch (error) {
      console.log(error);
    }

    if(supplier.length === 0) {
      toast.success("no data in this period");
    }
    
    console.log("Here before data is loaded");
    <SupplierTable data={supplier} />
  }

  return (          
    <div>
      <header align="center">
        <h1>Supplier Data</h1>
      </header>
          
      <div className="container-fluid d-flex justify-center col-sm-4" >
        <select  id="selectMonth" className="form-control" onChange={(e) => setMonth(e.target.value)}>
          <option value="default">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select><br/>
     
        <select id="selectYear" onChange={(e) => setYear(e.target.value)} className="form-control">
          <option value="default">Select Year</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select><br/>
    
        <button onClick={(e) => {
          if(month !== "" && year !== "") {
            load() 
          } else {
            toast.error("Please select month and year of the data you require.")
          }
  
        }} className="btn btn-outline-secondary"> Load </button>
      </div>
    </div>
  );
};
export default SupplierData;