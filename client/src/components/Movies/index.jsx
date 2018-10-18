import React, { PropTypes } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import List from '../List';
import MoviePage from '../MoviePage';
import Categories from '../Categories';

const Movies = (props) => {
  const { match } = props;
  return (
    <div>
      <Switch>
        <Route exact path={match.url} render={() => <Categories match={match} />} />
        <Route exact path={`${match.url}/:option`} component={List} />
        <Route path={`${match.url}/:option/:id`} component={MoviePage} />
        {/* <Redirect to={`${match.url}/now_playing`} /> */}
      </Switch>
    </div>
  );
};

export default Movies;
