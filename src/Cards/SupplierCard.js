import React from "react";
import "../Styles/card.css";

function SupplierCard() {
  return (
    <div className="Card">
      <div className="upper-container">
        <div className="image-container img">
          <img
            src="https://s37564.pcdn.co/wp-content/uploads/2017/11/Supplier-101117-scaled.jpeg.optimal.jpeg"
            alt=""
            height="100px"
            width="100px"
          />
        </div>
        <div className="lower-container">
          <h3> {"Supplier Data"} </h3>
          <p> {"This card will take you to the Supplier reporting, Click me to view Supplier Data reports."} </p>

          <button
            onClick={(event) => (
              (window.location.href =
                "/SupplierData"),
              "_blank"
            )}
          >
            Go to Supplier
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupplierCard;