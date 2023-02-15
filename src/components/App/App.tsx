import React from 'react';
import './App.css';
import { debounce } from 'lodash';

import { Provider } from '../../context/Context';
import MovieService from '../../service/MovieService';
import Tab from '../Tab/Tab';
import type { StateType } from '../../Types';
export default class App extends React.Component<{}, StateType> {
  state = {
    data: [],
    loading: true,
    error: false,
    notFound: false,
    valuePaginationSearch: 1,
    valuePaginationRated: 1,
    totalPage: 0,
    totalLikePage: 0,
    searchValue: '',
    genre: [{ id: 0, name: '' }],
    idSession: '',
    likeData: [],
    valueTabs: '1',
  };

  MovieService = new MovieService();

  updateMovies(value: string, page: number) {
    this.MovieService.getSearchList(value, page)
      .then((response) => {
        this.setState({
          data: response.results,
          loading: false,
          error: false,
          notFound: false,
          totalPage: response.total_results,
        });
        if (!response.results.length) {
          this.setState({ notFound: true });
        }
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  }

  onSearch = (value: string) => {
    if (value) {
      this.setState({
        loading: true,
        data: [],
        notFound: false,
        searchValue: value,
      });
      this.debounce(value);
    } else {
      this.setState({
        data: [],
        loading: false,
        error: false,
        notFound: false,
      });
    }
  };

  debounce = debounce((value) => {
    this.updateMovies(value, this.state.valuePaginationSearch);
  }, 1000);

  changePagePagination = (value: number) => {
    if (this.state.valueTabs === '1' && this.state.searchValue) {
      this.setState({ valuePaginationSearch: value });
      this.updateMovies(this.state.searchValue, value);
    }
    if (this.state.valueTabs === '2') {
      this.setState({ valuePaginationRated: value });
      this.getLikeList(value);
    }
    window.scrollTo(0, 0);
    if (!this.state.searchValue) {
      this.setState({ valuePaginationSearch: value });
      this.updatePopularList(value);
    }
  };

  updatePopularList = (value: number) => {
    this.MovieService.getPopularList(value).then((response) => {
      this.setState({
        data: response.results,
        loading: false,
        totalPage: response.total_results,
      });
    });
  };

  componentDidMount() {
    this.updatePopularList(this.state.valuePaginationSearch);
    this.MovieService.getGenreList().then((response) => {
      this.setState({ genre: response.genres });
    });
    if (sessionStorage.getItem('idSession')) {
      this.setState({ idSession: sessionStorage.getItem('idSession') });
    } else {
      this.MovieService.getIdSession().then((response) => {
        this.setState({ idSession: response.guest_session_id });
        sessionStorage.setItem('idSession', response.guest_session_id);
      });
    }
  }

  onLike = (id: number, rate: number) => {
    this.MovieService.postLikeMovie(id, rate, this.state.idSession);
  };

  getLikeList = (page: number) => {
    this.MovieService.getLikeMovies(this.state.idSession, page).then((response) => {
      this.setState({
        likeData: response.results,
        loading: false,
        totalLikePage: response.total_results,
      });
    });
  };

  changePageTabs = (value: string) => {
    this.setState({ valueTabs: value });
    if (value === '2') {
      this.setState({ loading: true });
      this.getLikeList(1);
    }
  };

  render() {
    return (
      <div className="App">
        <Provider value={this.state.genre}>
          <Tab
            props={this.state}
            onChangeTabs={this.changePageTabs}
            onChangePage={this.changePagePagination}
            onSearch={this.onSearch}
            onLike={this.onLike}
          />
        </Provider>
      </div>
    );
  }
}
