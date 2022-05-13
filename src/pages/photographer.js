/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
// eslint-disable-next-line import/no-cycle
import {
  photographerDetail, photographerMediaList, lightboxFactory,
} from '../factories/media.js';

let filter = [];
const filterSelect = document.getElementById('media-select');
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
  photographerMedia.forEach((media) => {
    const mediaModel = photographerMediaList(media, photographerName);
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
  // const photographerMedia = await getUserMediaByID(userID);
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
 *  manages the previous direction in lightbox
 * @param {array} filterCurrent
 * @param {string} photographerInfo
 * @param {id} imageID
 * @param {string} mediaSection
 * @returns id
 */
/* eslint no-param-reassign: ["error", { "props": false }] */
export const previousImage = (filterCurrent, photographerInfo, imageID, mediaSection) => {
  if (imageID === 0) {
    imageID = filterCurrent.length - 1;
  } else {
    imageID -= 1;
  }
  mediaSection.innerHTML = lightboxFactory(filterCurrent, photographerInfo, imageID)
    .getlightBoxCardDOM();
  return imageID;
};

/**
 *  manages the next direction in lightbox
 * @param {array} filterCurrent
 * @param {string} photographerInfo
 * @param {id} imageID
 * @param {string} mediaSection
 * @returns
 */
export const nextImage = (filterCurrent, photographerInfo, imageID, mediaSection) => {
  if (imageID === filterCurrent.length - 1) {
    imageID = 0;
  } else {
    imageID += 1;
  }
  mediaSection.innerHTML = lightboxFactory(filterCurrent, photographerInfo, imageID)
    .getlightBoxCardDOM();
  return imageID;
};

// eslint-disable-next-line no-unused-vars
/**
 * handle lightBox
 * @param {id} mediaID
 */
export async function displayLigthModal(mediaID) {
  const mediaSection = document.querySelector('.caroussel-content');
  const modalSection = document.getElementById('lightbox_modal');
  modalSection.classList.add('active');
  const photographerInfo = await getUserInfo();
  const filterCurrent = !filter ? getFilterCurrent() : filter;// changer
  const image = filterCurrent.find((element) => element.id == mediaID);
  let imageID = filterCurrent.indexOf(image);
  mediaSection.innerHTML = lightboxFactory(filterCurrent, photographerInfo, imageID)
    .getlightBoxCardDOM();
  const leftArrow = document.querySelector('.carousel__button--prev');
  const rightArrow = document.querySelector('.carousel__button--next');

  // event click
  leftArrow.addEventListener('click', () => {
    // console.log('gauche')
    imageID = previousImage(filterCurrent, photographerInfo, imageID, mediaSection);
  });

  rightArrow.addEventListener('click', () => {
    // console.log('droite')
    imageID = nextImage(filterCurrent, photographerInfo, imageID, mediaSection);
  });

  // keyboard key
  document.addEventListener('keyup', (e) => {
    // console.log(e.key)
    if (e.key === 'ArrowLeft') {
      imageID = previousImage(filterCurrent, photographerInfo, imageID, mediaSection);
    } else if (e.key === 'ArrowRight') {
      imageID = nextImage(filterCurrent, photographerInfo, imageID, mediaSection);
    } else if (e.key === 'Escape') {
      modalSection.classList.replace('active', 'hidden');
    }
  });
}
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
/**
 * close lightbox modal
 */
const closeLightModal = () => {
  const lightModal = document.getElementById('lightbox_modal');
  lightModal.classList.remove('active');
};

async function init() {
  const closeM = document.querySelector('.close');
  closeM.addEventListener('click', closeLightModal);
  const userID = getIdOfUser();
  const photographerMedia = await getUserMediaByID(userID);
  filter = photographerMedia.sort((a, b) => b.likes - a.likes);
  displayUserMedias();
}

init();
