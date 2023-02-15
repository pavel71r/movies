import type { OptionsFetchType } from '../Types';

export default class MovieService {
  BaseUrl = 'https://api.themoviedb.org/3';
  ApiKey = 'api_key=1735ed745ae5157a35bd815466359e75';

  async getResource(url: string, options?: OptionsFetchType) {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error();
    }
    const body = await res.json();
    return body;
  }

  async getIdSession() {
    const url = `${this.BaseUrl}/authentication/guest_session/new?${this.ApiKey}`;
    const response = await this.getResource(url);
    return response;
  }

  async getGenreList() {
    const url = `${this.BaseUrl}/genre/movie/list?${this.ApiKey}&language=en-US`;
    const response = await this.getResource(url);
    return response;
  }

  async getPopularList(value: number) {
    const url = `${this.BaseUrl}/movie/popular?${this.ApiKey}&language=en-US&page=${value}`;
    const response = await this.getResource(url);
    return response;
  }

  async getLikeMovies(userId: string, page: number) {
    const url = `${this.BaseUrl}/guest_session/${userId}/rated/movies?${this.ApiKey}&page=${page}`;
    const response = await this.getResource(url);
    return response;
  }

  async getSearchList(value: string, page: number) {
    const url = `${this.BaseUrl}/search/movie?${this.ApiKey}&query=${value}&page=${page}`;
    const response = await this.getResource(url);
    return response;
  }

  async postLikeMovie(idMovies: number, value: number, userId: string) {
    const url = `${this.BaseUrl}/movie/${idMovies}/rating?${this.ApiKey}&guest_session_id=${userId}`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ value: value }),
    };
    const response = await this.getResource(url, options);
    return response;
  }
}
