type OptionsType = {
  method: string;
  headers: { 'Content-Type': string };
  body: string;
};

export default class PostLike {
  async getResource(idMovies: number, value: number, userId: string) {
    const url = `https://api.themoviedb.org/3/movie/${idMovies}/rating?api_key=1735ed745ae5157a35bd815466359e75&guest_session_id=${userId}
    `;

    const options: OptionsType = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ value: value }),
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error();
    }
    const body = await res.json();
    return body;
  }

  async postLikeMovie(idMovies: number, value: number, userId: string) {
    const response = await this.getResource(idMovies, value, userId);
    return response;
  }
}
