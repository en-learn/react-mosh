import React from "react";

const LikeButton = ({ isLiked, onLike }) => {
  let iconClasses = "fa fa-heart";
  if (!isLiked) iconClasses += "-o";
  return (
    <i
      className={iconClasses}
      style={{ cursor: "pointer" }}
      onClick={() => onLike()}
      aria-hidden="true"
    />
  );
};

export default LikeButton;
