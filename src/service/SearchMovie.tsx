export default class SearchMovie {
  url = 'https://api.themoviedb.org/3/search/movie?api_key=1735ed745ae5157a35bd815466359e75&query=';
  async getResource(value: string, page: number) {
    const res = await fetch(`${this.url}${value}&page=${page}`);
    if (!res.ok) {
      throw new Error();
    }
    const body = await res.json();
    return body;
  }

  async getPeople(value: string, page: number) {
    const response = await this.getResource(value, page);
    return response;
  }
}
