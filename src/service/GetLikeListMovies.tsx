export default class GetLikeListMovies {
  async getResource(userId: string, page = 1) {
    const url = `https://api.themoviedb.org/3/guest_session/${userId}/rated/movies?api_key=1735ed745ae5157a35bd815466359e75&page=${page}
      `;

    const res: any = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    const body = await res.json();
    return body;
  }

  async getLikeMovies(userId: string, page?: number | undefined) {
    const response = await this.getResource(userId, page);
    return response;
  }
}
