import React from 'react';
import { Row } from 'react-materialize';
import CategoryItem from '../CategoryItem';


const Categoties = ({match}) => (
  <Row className="valign">
    <CategoryItem title="Now Playing" match={match} category="now_playing" />
    <CategoryItem title="Upcoming" match={match} category="upcoming" />
    <CategoryItem title="Popular" match={match} category="popular" />
  </Row>
);

export default Categoties;
