import debounce from 'lodash.debounce';
import getRefs from './get-Refs';
import eventTLP from '../tamplates/list.hbs';
import NewsApiService from './apiService';

const refs = getRefs();
const newsApiService = new NewsApiService();
refs.inputSearchForm.addEventListener('input', debounce(onInput, 2000));

const option = {
  totalItems: 600,
  visiblePages: 3,
  itemsPerPage: 10,
};

if (newsApiService.query == 0) {
  randomList();
  startPagination();
}

function onInput(e) {
  e.preventDefault();
  newsApiService.query = e.target.value;
  newsApiService.resetPage();
  clearContainer();

  fetchHits();
  //   pagination.movePageTo(1);
  startPagination();
}

function randomList() {
  newsApiService.fetchRandom().then(events => {
    appendMarkup(events);
  });
}

function fetchHits() {
  newsApiService.fetchArticles().then(events => {
    appendMarkup(events);
  });
  // .then(startPagination());
}

function appendMarkup(events) {
  refs.eventList.insertAdjacentHTML('beforeend', eventTLP(events));
}

function clearContainer() {
  refs.eventList.innerHTML = '';
}

function startPagination() {
  // const totalElements = newsApiService.totalElements < 980 ? newsApiService.totalElements : 980;
  let totalElements;
  console.log(newsApiService.totalElements);
  if (newsApiService.totalElements < 980) {
    totalElements = newsApiService.totalElements;
  } else {
    totalElements = 980;
  }

  option.totalItems = Number(totalElements);
  console.log(option.totalItems);
  const pagination = new tui.Pagination('tui-pagination-container', option);
  pagination.on('beforeMove', function (e) {
    newsApiService.setPage(e.page);
    clearContainer();
    fetchHits();
    //   onScrollToTop();
  });
}
