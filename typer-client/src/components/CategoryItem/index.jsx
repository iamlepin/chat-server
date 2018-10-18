import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Col } from 'react-materialize';
import CrossfadeImage from 'react-crossfade-image';
import { connect } from 'react-redux';
import { loadMovies } from '../../actions/moviesActions';

class CategoryItem extends Component {
  timer = null;

  state = {
    page: 0,
  }

  componentDidMount = () => {
    this.props.load(this.props.category, 'language=en-US&page=1');
    const that = this;
    this.timer = setInterval(() => {
      that.setState(prevState => ({
        page: prevState.page === 19 ? 0 : prevState.page + 1,
      }));
    }, 3000);
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

  render() {
    const { title, category, match } = this.props;
    const { results } = this.props.movies[category];

    return (
      <Col s={12} m={4}>
        <NavLink to={`${match.url}/${category}`}>
          <div className="card category-card">
            <div className="card-action">
              <h5>{title}</h5>
              {/* <h4>{title}</h4> */}
            </div>
            <div className="card-image">
              {results &&
                <CrossfadeImage src={`http://image.tmdb.org/t/p/w500/${results[this.state.page].poster_path}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
              }
            </div>
          </div>
        </NavLink>
      </Col>
    );
  }
}
const mapStateToProps = state => ({
  movies: state.movies,
});

const mapDispatchToProps = dispatch => ({
  load(querry, param) {
    dispatch(loadMovies(querry, param));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
