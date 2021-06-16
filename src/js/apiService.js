import { BASE_URL } from './baseData';
import { KEY } from './baseData';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalElements = 980;
  }

  fetchArticles() {
    return (
      fetch(
        `${BASE_URL}events.json?&keyword=${this.searchQuery}&size=10&page=${this.page}&apikey=${KEY}`,
      )
        .then(r => r.json())
        //   .then(({ _embedded }) => {
        .then(data => {
          // this.page += 1;
          this.totalElements = data.page.totalElements;
          return data._embedded.events;
        })
        .catch(error => console.log(error))
    );
  }

  fetchRandom() {
    return (
      fetch(
        `${BASE_URL}events.json?classificationName=music&sort=random&size=1 0&page=1&apikey=${KEY}`,
      )
        .then(r => r.json())
        //   .then(({ _embedded }) => {
        .then(data => {
          //   this.totalElements = data.page.totalElements;
          return data._embedded.events;
        })
        .catch(error => console.log(error))
    );
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQwery) {
    this.searchQuery = newQwery;
  }

  setPage(page) {
    this.page = page;
  }
}
