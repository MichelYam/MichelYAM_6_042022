export default class Api {
  /**
       *
       * @param {string} url
       */
  constructor(url) {
    /* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((err) => console.log('an error occurs', err));
  }
}
