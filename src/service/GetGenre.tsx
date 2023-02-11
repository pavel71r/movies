export default class GetGenre {
  url = '  https://api.themoviedb.org/3/genre/movie/list?api_key=1735ed745ae5157a35bd815466359e75&language=en-US';
  async getResource() {
    const res = await fetch(this.url);
    if (!res.ok) {
      throw new Error();
    }
    const body = await res.json();
    return body;
  }

  async getGenreList() {
    const response = await this.getResource();
    return response;
  }
}
