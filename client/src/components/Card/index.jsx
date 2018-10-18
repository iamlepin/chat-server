import React from 'react';
import noImage from '../../images/No_Image_Available.jpg';

const Card = ({ backdrop_path, original_title, release_date, vote_average, handleCardHover }) => (
  <div className="card movie-card pointer">
    <div className="card-image card-image--list">
      <img src={backdrop_path ? `http://image.tmdb.org/t/p/w300/${backdrop_path}` : noImage} alt={original_title} />
      <span className="card-title card-title--list"> {original_title} </span>
    </div>
    <div className="card-content">
      <p>Release date {release_date}</p>
      <p>Rating {vote_average}/10</p>
    </div>
  </div>
);

export default Card;
