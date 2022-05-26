/* eslint-disable import/no-cycle */
/* eslint max-classes-per-file: ["error", 4] */
import { addLike } from '../pages/photographer.js';
import LightBox from './lightBox.js';
/**
 * handle media image
 */
class MediaImage {
  constructor(media, photographerName) {
    this.image = media.image;
    this.title = media.title;
    this.id = media.id;
    this.photographerName = photographerName;
  }

  render() {
    return (`<img 
            src="./assets/images/media/${this.photographerName}/${this.image}"
            alt="${this.title}" />`);
  }
}
/**
 * handle media video
 */
class MediaVideo {
  constructor(media, photographerName) {
    this.video = media.video;
    this.title = media.title;
    this.id = media.id;
    this.photographerName = photographerName;
  }

  render() {
    return (`
      <video controls id="mediaVideo" aria-label="${this.title}">
        <source src="./assets/images/media/${this.photographerName}/${this.video}" type="video/mp4" />
      </video>`);
  }
}

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
    <button class="contact_button" onclick="displayModal()" aria-label="Formulaire pour contacter le photographe">Contactez-moi</button>
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

  function getMediasCardDOM() {
    const h2 = document.createElement('h2');
    h2.textContent = title;

    const i = document.createElement('i');
    i.setAttribute('class', 'far fa-heart');
    i.setAttribute('tabindex', '0');
    i.setAttribute('aria-label', 'boutton like');
    i.addEventListener('click', () => {
      addLike(id);
    });
    i.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        addLike(id);
      }
    });
    const span = document.createElement('span');
    span.textContent = likes;
    span.setAttribute('aria-label', `${likes} like `);

    const mediaAssets = document.createElement('div');
    const mediaContent = mediaFactory;
    mediaAssets.innerHTML = mediaContent;
    mediaAssets.setAttribute('class', 'photographer-media');
    mediaAssets.setAttribute('tabindex', '0');
    mediaAssets.addEventListener('click', () => {
      lightBox.render();
    });
    mediaAssets.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        lightBox.render();
      }
    });
    const iconVideo = document.createElement('i');
    iconVideo.setAttribute('class', 'fas fa-video');
    if (media.video) {
      mediaAssets.append(iconVideo);
    }

    const likeDiv = document.createElement('div');
    likeDiv.setAttribute('class', 'media-like');
    likeDiv.setAttribute('id', id);
    likeDiv.append(span, i);

    const div = document.createElement('div');
    div.setAttribute('class', 'media-content');
    div.append(h2, likeDiv);

    const articleContainer = document.createElement('article');
    articleContainer.setAttribute('class', 'medial-container');
    articleContainer.setAttribute('data-id', `${id}`);
    articleContainer.append(mediaAssets, div);

    return articleContainer;
  }
  return { getMediasCardDOM };
}
