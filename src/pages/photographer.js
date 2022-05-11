import {
  photographerDetail, photographerMediaList, lightboxFactory,
} from '../factories/media.js';
/* eslint eqeqeq: ["error", "always"] */
async function getPhotographers() {
  const data = await fetch('../../data/photographers.json')
    .then((res) => res.json())
    .catch((req) => { throw new Error(req); });
  return data;
}

// get user ID from url
const getIdOfUser = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  return id;
};

const getUserInfo = async () => {
  const { photographers } = await getPhotographers();
  const userID = getIdOfUser();
  const photographerInfo = photographers.find((photographer) => photographer.id == userID);
  return photographerInfo;
};

// display data of the user
const displayUserData = async () => {
  const photographerInfo = await getUserInfo();
  const photographerSection = document.querySelector('.photograph-header');
  photographerSection.innerHTML = photographerDetail(photographerInfo);
};

displayUserData();
// // <----- media ----->

const getUserMediaByID = async (userID) => {
  const { media } = await getPhotographers();
  const photographerMedia = media.filter((element) => element.photographerId == userID);
  return photographerMedia;
};
// get structure HTML of the user
const getUserMedias = async (photographerMedia, photographerName) => {
  const mediaSection = document.querySelector('.photographer_media_section');
  // mediaSection.innerHTML = photographerMediaList(photographerMedia, photographerName)
  //   .getMediasCardDOM();
  // constructor(media, type, photographerName) {
  photographerMedia.forEach((media) => {
    const mediarModel = photographerMediaList(media, photographerName);
    const mediaCardDOM = mediarModel.getMediasCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
};
// photographers.forEach((photographer) => {
//   const photographerModel = photographerFactory(photographer);
//   const userCardDOM = photographerModel.getUserCardDOM();
//   photographersSection.appendChild(userCardDOM);
// });
// display data of the user
const displayUserMedias = async () => {
  const { photographers } = await getPhotographers();
  const userID = getIdOfUser();
  const photographerMedia = await getUserMediaByID(userID);
  const photographerName = photographers.find((element) => element.id == userID)
    .name.split(' ')[0].replace('-', ' ');
  getUserMedias(photographerMedia, photographerName);
};

// Filter
const filter = document.getElementById('media-select');
/**
 * get array of photographer depending on the filter
 * @returns {array}
 */
const getFilterCurrent = async () => {
  let filterCurrent = [];
  const { photographers } = await getPhotographers();
  const userID = getIdOfUser();
  const photographerName = photographers.find((element) => element.id == userID)
    .name.split(' ')[0].replace('-', ' ');
  const photographerMedia = await getUserMediaByID(userID);
  switch (filter.value) {
    case 'popularity': {
      const filterByPopularity = photographerMedia.sort((a, b) => b.likes - a.likes);
      filterCurrent = filterByPopularity;
    }
      break;
    case 'date': {
      const filterByDate = photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
      filterCurrent = filterByDate;
    }
      break;
    case 'title': {
      const filterByTitle = photographerMedia.sort((a, b) => (a.title < b.title ? -1 : 1));
      filterCurrent = filterByTitle;
      break;
    }
    default:
      console.log(filter.value);
  }
  getUserMedias(filterCurrent, photographerName);
  return filterCurrent;
};

filter.addEventListener('change', getFilterCurrent);

/**
 *  manages the previous direction in lightbox
 * @param {array} filterCurrent
 * @param {string} photographerInfo
 * @param {int} imageID
 * @param {string} mediaSection
 * @returns
 */
/* eslint no-param-reassign: ["error", { "props": false }] */
const previousImage = (filterCurrent, photographerInfo, imageID, mediaSection) => {
  if (imageID === 0) {
    imageID.prop = filterCurrent.length - 1;
  } else {
    imageID.prop -= 1;
  }
  mediaSection.innerHTML = lightboxFactory(filterCurrent, photographerInfo, imageID)
    .getlightBoxCardDOM();
  return imageID;
};

/**
 *  manages the next direction in lightbox
 * @param {array} filterCurrent
 * @param {string} photographerInfo
 * @param {int} imageID
 * @param {string} mediaSection
 * @returns
 */
const nextImage = (filterCurrent, photographerInfo, imageID, mediaSection) => {
  if (imageID === filterCurrent.length - 1) {
    imageID.prop = 0;
  } else {
    imageID.prop += 1;
  }
  mediaSection.innerHTML = lightboxFactory(filterCurrent, photographerInfo, imageID)
    .getlightBoxCardDOM();
  return imageID;
};

/**
 * handle lightBox
 * @param {int} mediaID
 */

async function displayLigthModal(mediaID) {
  const mediaSection = document.querySelector('.caroussel-content');
  const modalSection = document.getElementById('lightbox_modal');
  modalSection.classList.replace('hidden', 'active');
  const photographerInfo = await getUserInfo();
  const filterCurrent = getFilterCurrent();
  const image = filterCurrent.find((element) => element.id == mediaID);
  let imageID = filterCurrent.indexOf(image);
  const ligthboxCardDOM = lightboxFactory(filterCurrent, photographerInfo, imageID)
    .getlightBoxCardDOM();
  mediaSection.innerHTML = ligthboxCardDOM;
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

displayUserMedias();
console.log(document.getElementById('lightBoxMedia'));
