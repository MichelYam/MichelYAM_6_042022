/* eslint-disable import/no-cycle */
import {
  photographerDetail, photographerMediaList,
} from '../factories/media.js';
import PhotographerApi from '../api/api.js';

let filter = [];
const filterSelect = document.getElementById('filter-select');

/**
 * get all photographer form api
 * @returns
 */
const getPhotographersApi = async () => {
  const photographerApi = new PhotographerApi('../../data/photographers.json');
  const photographerData = await photographerApi.getPhotographers();
  return photographerData;
};
/**
 * get all media form api
 * @returns {array}
 */
const getMediaApi = async () => {
  const photographerApi = new PhotographerApi('../../data/photographers.json');
  const mediaData = await photographerApi.getMedias();
  return mediaData;
};

/**
 * get id form url
 * @returns {array}
 */
const getIdOfUser = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  return parseInt(id, 10);
};
/**
 * get user info
 * @returns {array}
 */
export default async function getUserInfo() {
  const photographers = await getPhotographersApi();
  const userID = getIdOfUser();
  const photographerInfo = photographers.find((photographer) => photographer.id === userID);
  return photographerInfo;
}

/**
 * display user data
 */
const displayUserData = async () => {
  const photographerInfo = await getUserInfo();
  const photographerSection = document.querySelector('.photograph-header');
  photographerSection.innerHTML = photographerDetail(photographerInfo);
};

displayUserData();

// // <----- media ----->
/**
 * get all media from specific user
 * @param {id} userID
 * @returns {array}
 */
const getUserMediaByID = async (userID) => {
  const media = await getMediaApi();
  // eslint-disable-next-line eqeqeq
  const photographerMedia = media.filter((element) => element.photographerId == userID);
  return photographerMedia;
};

/**
 * get structure HTML of the user
 * @param {array} photographerMedia
 * @param {string} photographerName
 */
const getUserMedias = async (photographerMedia, photographerName) => {
  const mediaSection = document.querySelector('.photographer_media_section');
  mediaSection.innerHTML = '';
  photographerMedia.forEach((media) => {
    const mediaModel = photographerMediaList(photographerMedia, media, photographerName);
    const mediaCardDOM = mediaModel.getMediasCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
  const mediaVideo = document.querySelector('.photographer-media video');
  mediaVideo.removeAttribute('controls');
};

/**
 * get all like media
 * @returns {number}
 */
export const getLikes = () => {
  const getElementDOM = document.getElementById('price');
  const elementDom = document.querySelectorAll('.media-like span');
  const array = [];
  elementDom.forEach((item) => {
    array.push(parseInt(item.innerHTML, 10));
  });
  let totalLike = 0;
  totalLike = array.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  );
  getElementDOM.innerHTML = totalLike;
  return totalLike;
};

/**
 * display data of the user
 */
const displayUserMedias = async () => {
  const photographers = await getPhotographersApi();
  const userID = getIdOfUser();
  const photographerName = photographers.find((element) => element.id === userID)
    .name.split(' ')[0].replace('-', ' ');
  getUserMedias(filter, photographerName);
  getLikes();
};

/**
 * get array of photographer depending on the filter
 * @returns {array}
 */
export const getFilterCurrent = async () => {
  const photographers = await getPhotographersApi();
  const userID = getIdOfUser();
  const photographerName = photographers.find((element) => element.id === userID)
    .name.split(' ')[0].replace('-', ' ');
  const photographerMedia = await getUserMediaByID(userID);
  switch (filterSelect.value) {
    case 'popularity': {
      const filterByPopularity = photographerMedia.sort((a, b) => b.likes - a.likes);
      filter = filterByPopularity;
    }
      break;
    case 'date': {
      const filterByDate = photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
      filter = filterByDate;
    }
      break;
    case 'title': {
      const filterByTitle = photographerMedia.sort((a, b) => (a.title < b.title ? -1 : 1));
      filter = filterByTitle;
      break;
    }
    default:
      console.log(filter.value);
  }
  getUserMedias(filter, photographerName);
};

filterSelect.addEventListener('change', getFilterCurrent);
/**
 *  add or remove like on click
 * @param {id} mediaID
 */
export async function addLike(mediaID) {
  const getElementDOM = document.getElementById('price');
  let totalLike = getLikes();
  const likeDiv = document.querySelector(`div[id='${mediaID}'] span`);
  const articleSection = document.querySelector(`div[id='${mediaID}'] i`);
  if (articleSection.classList.contains('far')) {
    likeDiv.textContent = parseInt(likeDiv.textContent, 10) + 1;
    totalLike += 1;
    articleSection.classList.replace('far', 'fas');
  } else {
    likeDiv.textContent = parseInt(likeDiv.textContent, 10) - 1;
    totalLike -= 1;
    articleSection.classList.replace('fas', 'far');
  }
  getElementDOM.innerHTML = totalLike;
}

async function init() {
  const userID = getIdOfUser();
  const photographerMedia = await getUserMediaByID(userID);
  filter = photographerMedia.sort((a, b) => b.likes - a.likes);
  displayUserMedias();
}

init();
