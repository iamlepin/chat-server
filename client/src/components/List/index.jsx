import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Pagination, Preloader } from 'react-materialize';
import { NavLink } from 'react-router-dom';
import { loadMovies } from '../../actions/moviesActions';
import Card from '../Card';

class List extends Component {
  // componentDidMount() {
  //   this.props.load(this.props.match.params.option, 'language=en-US&page=1');
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.option !== nextProps.match.params.option) {
      this.props.load(nextProps.match.params.option, 'language=en-US&page=1');
    }
  }

  handlePagination = (page) => {
    this.props.load(this.props.match.params.option, `language=en-US&page=${page}`);
  }

  handleCardHover = (e) => {
    if (e.type === 'mouseenter') {
      e.currentTarget.classList.add('z-depth-5');
    }
    if (e.type === 'mouseleave') {
      e.currentTarget.classList.remove('z-depth-5');
    }
  }

  render() {
    const { option } = this.props.match.params;
    const { page, total_pages } = this.props.movies[option];
    return (
      <div>
        <Row>
          {this.props.movies.isLoading &&
            <Col s={12}>
              <div className="center-align">
                <Preloader size="big" />
              </div>
            </Col>
          }
          {this.props.movies.error &&
            <Col s={12}>
              <h5 className="center-align">Sorry, something goes wrong...</h5>
            </Col>
          }
          {this.props.movies[option].results !== undefined && this.props.movies[option].results.map(item => (
            <Col s={12} m={6} l={3}>
              <NavLink to={`${this.props.match.url}/${item.id}`}>
                <Card
                  backdrop_path={item.backdrop_path}
                  original_title={item.original_title}
                  release_date={item.release_date}
                  vote_average={item.vote_average}
                  handleCardHover={this.handleCardHover}
                />
              </NavLink>
            </Col>
          ))}
        </Row>
        <Row>
          <Col s={12} className="center-align">
            <Pagination
              onSelect={this.handlePagination}
              items={total_pages}
              activePage={this.props.movies[option].page}
              maxButtons={8}
            />
          </Col>
        </Row>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
