/* eslint-disable import/no-cycle */
/* eslint max-classes-per-file: ["error", 4] */
import { addLike } from '../pages/photographer.js';
import LightBox from './lightBox.js';
// import { displayModal } from '../utils/contactForm.js';
/**
 * handle media image
 */
class MediaImage {
  constructor(media, photographerName) {
    this._image = media.image;
    this._id = media.id;
    this._photographerName = photographerName;
  }

  render() {
    return (`<img 
            src="./assets/images/media/${this._photographerName}/${this._image}"
            alt="${this._image}" />`);
  }
}
/**
 * handle media video
 */
class MediaVideo {
  constructor(media, photographerName) {
    this._video = media.video;
    this._id = media.id;
    this._photographerName = photographerName;
  }

  render() {
    return (`
      <video controls id="mediaVideo" title="${this._video}">
        <source src="./assets/images/media/${this._photographerName}/${this._video}" type="video/mp4" />
      </video>`);
  }
}

/* eslint no-underscore-dangle: 0 */
/**
 * check if its video or image
 */
export class MediaFactory {
  static getMediaType(media, photographerName) {
    const mediaElement = media.video === undefined
      ? new MediaImage(media, photographerName).render()
      : new MediaVideo(media, photographerName).render();
    return mediaElement;
  }
}

/**
 * return photographer info
 * @param {array} photographer
 * @returns
 */
export function photographerDetail(photographer) {
  return (`
    <div class="photographer-text">
        <h1>${photographer.name}</h1>
        <h2>${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p>
        <div class="priceInfo"><span id="price"></span><i class="fas fa-heart"></i>${photographer.price}€/jour</div>
    </div>
    <button class="contact_button" onclick="displayModal()" aria-label="Contact me">Contactez-moi</button>
    <div class="photographer-img">
        <img src="./assets/photographers/${photographer.portrait}" alt="${photographer.name}"/>
    </div>
    `);
}
/**
 * get all media from a photographer
 * @param {array} media
 * @param {string} photographerName
 * @returns
 */
export function photographerMediaList(photographerMedia, media, photographerName) {
  const { likes, title, id } = media;
  const lightBox = new LightBox(photographerMedia, id, photographerName);
  const mediaFactory = MediaFactory.getMediaType(media, photographerName);
  // const test = mediaFactory ? console.log('image') : console.log('video');
  // console.log(test);
  function getMediasCardDOM() {
    const h2 = document.createElement('h2');
    h2.textContent = title;

    const i = document.createElement('i');
    i.setAttribute('class', 'far fa-heart');
    i.setAttribute('tabindex', '0');
    i.setAttribute('aria-label', 'like');

    const span = document.createElement('span');
    span.textContent = likes;
    span.setAttribute('aria-label', 'likes');
    const mediaAssets = document.createElement('div');
    mediaAssets.innerHTML = mediaFactory;
    mediaAssets.setAttribute('class', 'photographer-media');
    mediaAssets.addEventListener('click', () => {
      lightBox.init();
    });
    const test = document.querySelector('.photographer-media video');
    const testt = document.createElement('i');
    testt.setAttribute('class', 'fas fa-video');
    if (media.video) {
      mediaAssets.append(testt);
    }
    const iconVideo = document.createElement('i');
    iconVideo.setAttribute('class', 'fas fa-video');

    const likeDiv = document.createElement('div');
    likeDiv.setAttribute('class', 'media-like');
    likeDiv.setAttribute('id', id);
    likeDiv.addEventListener('click', () => {
      addLike(id);
    });
    likeDiv.append(span, i);

    const div = document.createElement('div');
    div.setAttribute('class', 'media-content');
    div.append(h2, likeDiv);

    const articleContainer = document.createElement('div');
    articleContainer.setAttribute('class', 'medial-container');
    articleContainer.setAttribute('data-id', `${id}`);
    articleContainer.setAttribute('tabindex', '0');
    articleContainer.append(mediaAssets, div);

    return articleContainer;
  }
  return { getMediasCardDOM };
}
