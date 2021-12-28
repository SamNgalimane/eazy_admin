import React from "react";
import "../Styles/card.css";

function HomeCard({ name, about }) {
  return (
    <div className="Card">
      <div className="upper-container">
        <div className="image-container img">
          <img
            src="https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip"
            alt=""
            height="100px"
            width="100px"
          />
        </div>
        <div className="lower-container">
          <h3> {name} </h3>
          <p> {about} </p>

          <button
            onClick={(event) => (
              (window.location.href =
                "https://www.google.com/"),
              "_blank"
            )}
          >
            Go to Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeCard;