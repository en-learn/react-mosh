import React from "react";
import LikeButton from "./common/LikeButton";

const MovieRow = props => {
  const {
    _id: id,
    title,
    genre,
    numberInStock: stock,
    dailyRentalRate: rate,
    liked
  } = props.movie;

  return (
    <tr>
      <td>{title}</td>
      <td>{genre.name}</td>
      <td>{stock}</td>
      <td>{rate}</td>
      <td>
        <LikeButton isLiked={liked} onLike={props.onLike} />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.onDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MovieRow;
