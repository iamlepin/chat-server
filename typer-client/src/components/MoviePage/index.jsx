import React, { Component } from 'react';
import { Row, Col, Preloader, Badge } from 'react-materialize';
import { connect } from 'react-redux';
import { loadMovieInfo } from '../../actions/movieInfoActions';

class MoviePage extends Component {
  componentDidMount = () => {
    this.props.load(this.props.match.params.id, 'language=en-US');
  }

  render() {
    const { poster_path, original_title, overview, vote_average, vote_count } = this.props.movieInfo.data;
    return (
      <Row>
        <Col s={12}>
          <div className="card horizontal">
            {this.props.movieInfo.isLoading &&
              <Preloader size="big" />
            }
            <div className="card-image">
              <img src={`http://image.tmdb.org/t/p/w342/${poster_path}`} alt={original_title} />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <h4>
                  {original_title}
                </h4>
                <p>Rating {vote_average} / {vote_count} votes</p>
                <p>{overview}</p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  movieInfo: state.movieInfo,
});

const mapDispatchToProps = dispatch => ({
  load(querry, param) {
    dispatch(loadMovieInfo(querry, param));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
