import React from "react";
import SubHeader from "../../images/subheader.jpg";

const Banner = ({ title }) => {
  return (
    <section
      id="subheader"
      className="text-light"
      style={{ background: `url("${SubHeader}") top` }}
    >
      <div className="center-y relative text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>{title}</h1>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
