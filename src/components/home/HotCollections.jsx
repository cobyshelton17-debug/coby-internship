import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import Carousel from "../UI/Carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => setCollections(res.data))
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
        AOS.refreshHard();
      });
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading &&
            new Array(4).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <Skeleton width="100%" height="300px" borderRadius="8px" />
              </div>
            ))}
          {!loading && !error && (
            <div className="col-lg-12">
              <Carousel
                perView={4}
                breakpoints={{
                  "(max-width: 992px)": { slides: { perView: 2, spacing: 15 } },
                  "(max-width: 576px)": { slides: { perView: 1, spacing: 10 } },
                }}
              >
                {collections.map((collection, index) => (
                  <div
                    className="nft_coll"
                    key={collection.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="nft_wrap">
                      <Link
                        to={`/item-details/${collection.nftId}`}
                        state={{ collection }}
                      >
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}
          {!loading && error && (
            <div className="col-lg-12 text-center">
              <p>Failed to load hot collections.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
