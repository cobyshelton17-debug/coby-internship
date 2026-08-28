import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "../UI/Carousel";
import Skeleton from "../UI/Skeleton";

const getRemaining = (expiryDate) => {
  const diff = expiryDate - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => setItems(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || error) return;
    if (!items.some((item) => item.expiryDate)) return;
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [loading, error, items]);

  const renderCountdown = (expiryDate) => {
    if (!expiryDate) return null;
    const remaining = getRemaining(expiryDate);
    if (!remaining) return null;
    let label = `${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s`;
    if (remaining.days > 0) label = `${remaining.days}d ${label}`;
    return <div className="de_countdown">{label}</div>;
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
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
                {items.map((item) => {
                  const remaining = item.expiryDate
                    ? getRemaining(item.expiryDate)
                    : null;
                  return (
                    <div className="nft__item" key={item.id}>
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {remaining && renderCountdown(item.expiryDate)}

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
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
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
