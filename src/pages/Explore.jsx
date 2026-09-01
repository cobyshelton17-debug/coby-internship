import React, { useEffect } from "react";
import Banner from "../components/UI/Banner";
import ExploreItems from "../components/explore/ExploreItems";
import scrollToTop from "../utils/scrollToTop";

const Explore = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Banner title="Explore" />

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
