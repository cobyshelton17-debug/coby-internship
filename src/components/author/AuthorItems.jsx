import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "../UI/LikeButton";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ items = [], loading = false, hasId = false }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading &&
            new Array(8).fill(0).map((_, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={index}
              >
                <div className="nft__item">
                  <div className="nft__item_wrap">
                    <Skeleton width="100%" height="220px" borderRadius="8px" />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width="100px" height="18px" borderRadius="4px" />
                    <Skeleton width="70px" height="14px" borderRadius="4px" />
                  </div>
                </div>
              </div>
            ))}

          {!loading && !hasId && (
            <div className="col-md-12 text-center">
              <p>Select an author to see their items.</p>
            </div>
          )}

          {!loading && hasId && items.length === 0 && (
            <div className="col-md-12 text-center">
              <p>No items found for this author.</p>
            </div>
          )}

          {!loading &&
            items.map((item) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="#">
                      <img
                        className="lazy"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
