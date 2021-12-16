import React from "react";
import "./card.css";


function ContractCard({ name, about }) {
  return (
    <div className="Card">
      <div className="upper-container">
        <div className="image-container img">
          <img
            src="https://w7.pngwing.com/pngs/984/637/png-transparent-contract-computer-icons-law-others-logo-business-law.png"
            alt=""
            height="100px"
            width="100px"
          />
        </div>
        <div className="lower-container">
          <h3> {"Contract Data"} </h3>
          <p> {"This card will take you to the Reporting reporting, Click me to view Contract Data reports"} </p>

          <button
            onClick={(event) => (
              (window.location.href =
                '/ContractData'),
              "_blank"
            )}
          >
            Go to Contract
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default ContractCard;
