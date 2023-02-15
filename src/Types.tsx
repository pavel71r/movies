export type OptionsFetchType = {
  method: string;
  headers: { 'Content-Type': string };
  body: string;
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
  idSession: string | null;
  likeData: Array<DataType>;
  valueTabs: string;
};

export type GenreType = {
  id: number;
  name: string;
};

export type DataType = {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
  rating?: number | undefined;
};

export type ItemPropsType = {
  genre: Array<GenreType>;
  onLike: (id: number, value: number) => void;
  props: DataType;
};

export type ItemListPropsType = {
  onLike: (id: number, value: number) => void;
  props: DataType[];
};

export type PaginalType = {
  props: StateType;
  onChangePage: (value: number) => void;
};

export type SearchPanelStateType = {
  value: string;
};

export type SearchPanelPropsType = {
  onSearch: (value: string) => void;
};

export type TabType = {
  props: StateType;
  onChangeTabs: (value: string) => void;
  onChangePage: (value: number) => void;
  onSearch: (value: string) => void;
  onLike: (id: number, value: number) => void;
};
