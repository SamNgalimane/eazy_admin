import React, { useState } from "react";
import HomeCard from "../Cards/HomeCards";
import SupplierCard from "../Cards/SupplierCard";
import ContractCard from "../Cards/ContractCard";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [name] = useState("Google.com");
  const [about] = useState(
    "This card will take to to google home page.click open to open the browser page"
  );
  

  return (
    <div className="App">
      <div className="container-fluid d-flex justify-content-center m-5">
        <div className="row">
          <div className="col-md-4">
          <HomeCard name={name} about={about} />
          </div>
          <div className="col-md-4">
          <SupplierCard name={name} about={about} />
          </div>
            <div className="col-md-4">
            <ContractCard name={name} about={about} />
            </div>
          </div>
      </div>
    </div>
  );
};
export default Home;
