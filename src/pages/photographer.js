import { photographerDetail, photographerMediaList } from '../factories/media';
// Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
  await fetch('../../data/photographers.json')
    .then((res) => res.json())
    .catch((req) => { throw new Error(req); });
  // return data;
}

// get user ID from url
const getIdOfUser = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  return id;
};

const getUserInfo = async () => {
  const userID = getIdOfUser();
  const { photographers } = await getPhotographers();
  const photographerInfo = photographers.find((element) => element.id === userID);
  return photographerInfo;
};

// display data of the user
const displayUserData = async () => {
  const photographerInfo = await getUserInfo();
  const photographerSection = document.querySelector('.photograph-header');
  photographerSection.innerHTML = photographerDetail(photographerInfo);
};

displayUserData();

// <----- media ----->
const getUserMediaByID = async (userID) => {
  const { media } = await getPhotographers();
  const photographerMedia = media.filter((element) => element.photographerId === userID);
  return photographerMedia;
};
// get structure HTML of the user
const getUserMedias = async (photographerMedia, photographerName) => {
  const mediaSection = document.querySelector('.photographer_media_section');
  mediaSection.innerHTML = photographerMediaList(photographerMedia, photographerName);
};

// display data of the user
const displayUserMedias = async () => {
  const { photographers } = await getPhotographers();
  const userID = getIdOfUser();
  const photographerMedia = await getUserMediaByID(userID);
  const photographerName = photographers.find((element) => element.id === userID).name.split(' ')[0].replace('-', ' ');
  getUserMedias(photographerMedia, photographerName);
};
displayUserMedias();

// Filter

const filter = document.getElementById('media-select');
const getFilterCurrent = async () => {
  let filterCurrent = []
  const { photographers } = await getPhotographers();
  const userID = getIdOfUser();
  const photographerName = photographers.find((element) => element.id === userID).name.split(' ')[0].replace('-', ' ');
  const photographerMedia = await getUserMediaByID(userID);
  switch (filter.value) {
    case 'popularity':
      const filterByPopularity = photographerMedia.sort((a, b) => b.likes - a.likes);
      // console.log(filterByPopularity);
      filterCurrent = filterByPopularity;
      getUserMedias(filterByPopularity, photographerName);
      break;
    case 'date':
      const filterByDate = photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
      // console.log(filterByDate);
      filterCurrent = filterByDate;
      getUserMedias(filterByDate, photographerName);
      break;
    case 'title':
      const filterByTitle = photographerMedia.sort((a, b) => a.title < b.title ? -1 : 1);
      // console.log(filterByTitle);
      filterCurrent = filterByTitle;
      getUserMedias(filterByTitle, photographerName);
      break;
      
    default:
      console.log(filter.value);


  }
  return filterCurrent;
}



filter.addEventListener('change', getFilterCurrent);


async function displayLigthModal(mediaID) {
  const mediaSection = document.querySelector('.caroussel-content');
  const modalSection = document.getElementById('lightbox_modal');
  modalSection.classList.replace('hidden', 'active');
  const photographerInfo = await getUserInfo();
  const filterCurrent = await getFilterCurrent();
  const thePicture = filterCurrent.find((element) => element.id === mediaID);
  const imageID = filterCurrent.indexOf(thePicture);
  const ligthboxCardDOM = lightboxFactory(filterCurrent, photographerInfo, imageID).getlightBoxCardDOM();
  mediaSection.innerHTML = ligthboxCardDOM;
  const leftArrow = document.querySelector('.carousel__button--prev');
  const rightArrow = document.querySelector('.carousel__button--next');

  // event click
  leftArrow.addEventListener('click', () => {
    // console.log('gauche')
    imageID = previousImage(filterCurrent, photographerInfo, imageID, mediaSection);
  })

  rightArrow.addEventListener('click', () => {
    // console.log('droite')
    imageID = nextImage(filterCurrent, photographerInfo, imageID, mediaSection);
  })

  // keyboard key
  document.addEventListener('keyup', (e) => {
    // console.log(e.key)
    if (e.key === 'ArrowLeft') {
      imageID = previousImage(filterCurrent, photographerInfo, imageID, mediaSection);
    } else if (e.key === 'ArrowRight') {
      imageID = nextImage(filterCurrent, photographerInfo, imageID, mediaSection);
    } else if (e.key === 'Escape') {
      modalSection.classList.replace('active', 'hidden')
    }
  })
}

const previousImage = (filterCurrent, photographerInfo, imageID, mediaSection) => {
  if (imageID === 0) {
    imageID = filterCurrent.length - 1;
  } else {
    imageID--;
  }
  mediaSection.innerHTML = lightboxFactory(filterCurrent, photographerInfo, imageID).getlightBoxCardDOM();
  return imageID;
}

const nextImage = (filterCurrent, photographerInfo, imageID, mediaSection) => {
  if (imageID === filterCurrent.length - 1) {
    imageID = 0;
  } else {
    imageID++;
  }
  mediaSection.innerHTML = lightboxFactory(filterCurrent, photographerInfo, imageID).getlightBoxCardDOM();
  return imageID;
}

