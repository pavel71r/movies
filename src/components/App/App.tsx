import React from 'react';
import './App.css';
import { Spin, Pagination, Tabs } from 'antd';
import { debounce } from 'lodash';
import type { TabsProps } from 'antd';

import type { DataType } from '../Item/Item';
import ItemList from '../ItemList/ItemList';
import SearchMovie from '../../service/SearchMovie';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchPanel from '../SearchPanel/SearchPanel';
import GetGenre from '../../service/GetGenre';
import CreateSessionGuest from '../../service/CreateSessionGuest';
import PostLike from '../../service/PostLike';
import GetLikeListMovies from '../../service/GetLikeListMovies';

const { Provider, Consumer } = React.createContext<Array<GenreType>>([{ id: 0, name: '' }]);
export { Consumer };

type GenreType = {
  id: number;
  name: string;
};

export type StateType = {
  data: Array<DataType>;
  loading: boolean;
  error: boolean;
  notFound: boolean;
  valuePaginationSearch: number;
  valuePaginationRated: number;
  totalPage: number;
  totalLikePage: number;
  searchValue: string;
  genre: Array<GenreType>;
  idSession: string;
  likeData: Array<DataType>;
  valueTabs: string;
};

export default class App extends React.Component<{}, StateType> {
  SearchMovie = new SearchMovie();
  state = {
    data: [],
    loading: false,
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

  updateMovies(value: string, page: number) {
    this.SearchMovie.getPeople(value, page)
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
        this.errorMessage();
        this.setState({ loading: false });
      });
  }

  errorMessage = () => {
    this.setState({ error: true });
  };

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
    window.scrollTo(0, 0);

    if (this.state.valueTabs === '1') {
      this.setState({ valuePaginationSearch: value });
      this.updateMovies(this.state.searchValue, value);
    }
    if (this.state.valueTabs === '2') {
      this.setState({ valuePaginationRated: value });
      this.getLikeList(value);
    }
  };

  GetGenre = new GetGenre();

  componentDidMount() {
    this.GetGenre.getGenreList().then((response) => {
      this.setState({ genre: response.genres });
    });
    this.CreateSessionGuest.getIdSession().then((response) => {
      this.setState({ idSession: response.guest_session_id });
    });
  }

  CreateSessionGuest = new CreateSessionGuest();

  PostLike = new PostLike();

  onLike = (id: number, rate: number) => {
    this.PostLike.postLikeMovie(id, rate, this.state.idSession);
  };

  GetLikeListMovies = new GetLikeListMovies();

  getLikeList = (page?: number | undefined) => {
    this.GetLikeListMovies.getLikeMovies(this.state.idSession, page).then((response) => {
      this.setState({
        likeData: response.results,
        loading: false,
        totalLikePage: response.total_results,
      });
    });
  };

  changePageTabs = (value: string) => {
    this.setState({ valueTabs: value, loading: true });
    this.getLikeList();
  };

  render() {
    const spinner = this.state.loading ? <Spin /> : null;

    const errorMessage = this.state.error || this.state.notFound ? <ErrorMessage props={this.state} /> : null;

    const totalPage = this.state.valueTabs === '1' ? this.state.totalPage : this.state.totalLikePage;

    const defaultPage: number =
      this.state.valueTabs === '1' ? this.state.valuePaginationSearch : this.state.valuePaginationRated;

    const pagination =
      this.state.totalPage && !this.state.loading && !this.state.error ? (
        <Pagination
          defaultCurrent={defaultPage}
          total={totalPage}
          defaultPageSize={20}
          showSizeChanger={false}
          hideOnSinglePage
          onChange={(value) => {
            this.changePagePagination(value);
          }}
        />
      ) : null;

    let newData: Array<DataType> = [];
    if (this.state.valueTabs === '1') {
      newData = this.state.data;
    }
    if (this.state.valueTabs === '2') {
      newData = this.state.likeData;
    }

    const App = (
      <React.Fragment>
        {this.state.valueTabs === '1' && (
          <SearchPanel
            onSearch={(value) => {
              this.onSearch(value);
            }}
          />
        )}
        {spinner}
        {errorMessage}
        <ItemList
          props={newData}
          onLike={(id: number, rate: number) => {
            this.onLike(id, rate);
          }}
        />
        {pagination}
      </React.Fragment>
    );

    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'Search',
        children: App,
      },
      {
        key: '2',
        label: 'Rated',
        children: App,
      },
    ];

    return (
      <div className="App">
        <Provider value={this.state.genre}>
          <Tabs
            destroyInactiveTabPane
            defaultActiveKey="1"
            items={items}
            centered
            onChange={(value) => {
              this.changePageTabs(value);
            }}
          />
        </Provider>
      </div>
    );
  }
}
