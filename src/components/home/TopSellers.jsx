import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => setSellers(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      AOS.refreshHard();
    }
  }, [loading]);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {loading && (
              <ol className="author_list">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="120px" height="14px" borderRadius="4px" />
                      <Skeleton width="60px" height="12px" borderRadius="4px" />
                    </div>
                  </li>
                ))}
              </ol>
            )}
            {!loading && !error && (
              <ol className="author_list">
                {sellers.map((seller, index) => (
                  <li
                    key={seller.id}
                    data-aos="fade-up"
                    data-aos-delay={(index % 6) * 50}
                  >
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${seller.authorId}`}
                        state={{ authorId: seller.authorId }}
                      >
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link
                        to={`/author/${seller.authorId}`}
                        state={{ authorId: seller.authorId }}
                      >
                        {seller.authorName}
                      </Link>
                      <span>{seller.price.toFixed(2)} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            {!loading && error && (
              <div className="text-center">
                <p>Failed to load top sellers.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
