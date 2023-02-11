export default class CreateSessionGuest {
  url = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=1735ed745ae5157a35bd815466359e75';
  async getResource() {
    const res = await fetch(this.url);
    if (!res.ok) {
      throw new Error();
    }
    const body = await res.json();
    return body;
  }

  async getIdSession() {
    const response = await this.getResource();
    return response;
  }
}
