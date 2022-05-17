/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import {
  photographerDetail, photographerMediaList,
} from '../factories/media.js';

let filter = [];
const filterSelect = document.getElementById('filter-select');
/* eslint eqeqeq: ["error", "always"] */
/**
 * get photographer and media data
 * @returns object
 */
async function getPhotographers() {
  const data = await fetch('../../data/photographers.json')
    .then((res) => res.json())
    .catch((req) => { throw new Error(req); });
  return data;
}

/**
 * get id form url
 * @returns id
 */
const getIdOfUser = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  return id;
};
/**
 * get user info
 * @returns array
 */
export default async function getUserInfo() {
  const { photographers } = await getPhotographers();
  const userID = getIdOfUser();
  const photographerInfo = photographers.find((photographer) => photographer.id == userID);
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
 * @returns array
 */
const getUserMediaByID = async (userID) => {
  const { media } = await getPhotographers();
  // eslint-disable-next-line eqeqeq
  const photographerMedia = media.filter((element) => element.photographerId == userID);
  return photographerMedia;
};
// get structure HTML of the user
const getUserMedias = async (photographerMedia, photographerName) => {
  const mediaSection = document.querySelector('.photographer_media_section');
  mediaSection.innerHTML = '';
  // const lightBox = new LightBox(photographerMedia, id, photographerName);
  photographerMedia.forEach((media) => {
    const mediaModel = photographerMediaList(photographerMedia, media, photographerName);
    const mediaCardDOM = mediaModel.getMediasCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
};
// /**
//  * get total of likes
//  */
// utiliser json reduce
const getLikes = () => {
  const getElementDOM = document.getElementById('price');
  const elementDom = document.querySelectorAll('#like');
  let totalLike = 0;

  elementDom.forEach((item) => {
    totalLike += parseInt(item.textContent, 10);
  });
  getElementDOM.innerHTML = totalLike;
  return totalLike;
};
/**
 * display data of the user
 *
 */
const displayUserMedias = async () => {
  const { photographers } = await getPhotographers();
  const userID = getIdOfUser();
  const photographerName = photographers.find((element) => element.id == userID)
    .name.split(' ')[0].replace('-', ' ');
  getUserMedias(filter, photographerName);
  getLikes();
};

/**
 * get array of photographer depending on the filter
 * @returns {array}
 */
export const getFilterCurrent = async () => {
  const { photographers } = await getPhotographers();
  const userID = getIdOfUser();
  const photographerName = photographers.find((element) => element.id == userID)
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
  return filter;
};

filterSelect.addEventListener('change', getFilterCurrent);
/**
 *  add or remove like on click
 * @param {id} mediaID
 */
export async function addLike(mediaID) {
  const getElementDOM = document.getElementById('price');
  let totalLike = getLikes();
  const likeDiv = document.querySelector(`article[data-id='${mediaID}'] #like`);
  const articleSection = document.querySelector(`article[data-id='${mediaID}']`);
  if (!articleSection.classList.contains('liked')) {
    // console.log('ajouté');
    likeDiv.textContent = parseInt(likeDiv.textContent, 10) + 1;
    totalLike += 1;
    articleSection.classList.add('liked');
  } else if (articleSection.classList.contains('liked')) {
    // console.log('delete');
    likeDiv.textContent = parseInt(likeDiv.textContent, 10) - 1;
    totalLike -= 1;
    articleSection.classList.remove('liked');
  }
  getElementDOM.innerHTML = totalLike;
}
// /**
//  * close lightbox modal
//  */

async function init() {
  const userID = getIdOfUser();
  const photographerMedia = await getUserMediaByID(userID);
  filter = photographerMedia.sort((a, b) => b.likes - a.likes);
  displayUserMedias();
}

init();
