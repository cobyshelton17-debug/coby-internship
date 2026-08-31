import React, { useState } from "react";

const LikeButton = ({ likes }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="nft__item_like"
      style={{ cursor: "pointer" }}
      onClick={() => setLiked((l) => !l)}
      role="button"
      aria-pressed={liked}
    >
      <i className={`fa fa-heart${liked ? "" : "-o"}`}></i>
      <span>{likes + (liked ? 1 : 0)}</span>
    </div>
  );
};

export default LikeButton;
