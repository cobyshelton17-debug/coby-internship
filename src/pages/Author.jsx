import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const location = useLocation();

  const [author, setAuthor] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [followed, setFollowed] = useState(false);

  const id = authorId || location.state?.authorId;

  useEffect(() => {
    setFollowed(false);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      )
      .then((res) => {
        const data = res.data;
        setAuthor(data);
        setItems(
          (data.nftCollection || []).map((item) => ({
            ...item,
            authorImage: data.authorImage,
          }))
        );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const displayAuthor = author || {
    authorName: "Monica Lucas",
    authorImage: AuthorImage,
    tag: "monicaaaa",
    address: "UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7",
    followers: 573,
  };

  const followerCount = displayAuthor.followers + (followed ? 1 : 0);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <div
                          className="skeleton-box"
                          style={{ width: 150, height: 150, borderRadius: "50%" }}
                        ></div>
                      ) : (
                        <img src={displayAuthor.authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton
                              width="160px"
                              height="24px"
                              borderRadius="4px"
                            />
                          ) : (
                            displayAuthor.authorName
                          )}
                          <span className="profile_username">
                            @{displayAuthor.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {displayAuthor.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followerCount} followers
                      </div>
                      <button
                        className="btn-main"
                        style={{ minWidth: 130 }}
                        onClick={() => setFollowed((f) => !f)}
                      >
                        {followed ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {error ? (
                    <div className="text-center">
                      <p>Failed to load author data.</p>
                    </div>
                  ) : (
                    <AuthorItems
                      items={items}
                      loading={loading}
                      hasId={Boolean(id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
