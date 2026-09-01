import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import Carousel from "../UI/Carousel";
import Countdown from "../UI/Countdown";
import LikeButton from "../UI/LikeButton";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => setItems(res.data))
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
        AOS.refreshHard();
      });
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center" data-aos="fade-up">
              <h2>New Items</h2>
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
                {items.map((item, index) => {
                  return (
                    <div
                      className="nft__item"
                      key={item.id}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <Countdown expiryDate={item.expiryDate} />

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link
                          to={`/item-details/${item.nftId}`}
                          state={{ collection: item }}
                        >
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link
                          to={`/item-details/${item.nftId}`}
                          state={{ collection: item }}
                        >
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">
                          {item.price.toFixed(2)} ETH
                        </div>
                        <LikeButton likes={item.likes} />
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          )}
          {!loading && error && (
            <div className="col-lg-12 text-center">
              <p>Failed to load new items.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
