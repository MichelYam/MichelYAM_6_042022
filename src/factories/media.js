/* eslint-disable import/no-cycle */
/* eslint max-classes-per-file: ["error", 4] */
import { displayLigthModal, addLike } from '../pages/photographer.js';
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
            alt="${this._photographerName} ${this._image}" />`);
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
    return (`<video >
              <source src="./assets/images/media/${this._photographerName}/${this._video}" type="video/mp4" />
            </video>`);
  }
}

/* eslint no-underscore-dangle: 0 */
/**
 * check if its video or image
 */
class MediaFactory {
  static getMediaType(media, photographerName) {
    const mediaElement = media.video === undefined
      ? new MediaImage(media, photographerName)
      : new MediaVideo(media, photographerName);
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
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
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
export function photographerMediaList(media, photographerName) {
  const { likes, title, id } = media;
  const mediaFactory = MediaFactory.getMediaType(media, photographerName).render();
  // const picture = `assets/photographers/${portrait}`;
  function getMediasCardDOM() {
    const h2 = document.createElement('h2');
    h2.textContent = title;
    const i = document.createElement('i');
    i.setAttribute('class', 'fas fa-heart');

    const span = document.createElement('span');
    span.setAttribute('id', 'like');
    span.textContent = likes;

    const mediaAssets = document.createElement('div');
    mediaAssets.innerHTML = mediaFactory;
    mediaAssets.setAttribute('class', 'photographer-media');
    // mediaAssets.setAttribute('onclick', displayLigthModal(id));
    mediaAssets.addEventListener('click', () => {
      displayLigthModal(id);
    });

    const likeDiv = document.createElement('div');
    likeDiv.addEventListener('click', () => {
      addLike(id);
    });
    likeDiv.append(span, i);

    const div = document.createElement('div');
    div.append(h2, likeDiv);

    const articleContainer = document.createElement('article');
    articleContainer.setAttribute('class', 'medial-container');
    articleContainer.setAttribute('data-id', `${id}`);
    articleContainer.append(mediaAssets, div);

    return articleContainer;
  }
  return { getMediasCardDOM };
}
/**
 * returns the HTML structure of an image or video
 * @param {array} filterCurrent
 * @param {string} photographerInfo
 * @param {id} imageID
 * @returns
 */
export function lightboxFactory(filterCurrent, photographerInfo, imageID) {
  const photographerName = photographerInfo.name.split(' ')[0].replace('-', ' ');
  const mediaFactory = MediaFactory.getMediaType(filterCurrent[imageID], photographerName).render();
  function getlightBoxCardDOM() {
    return (` 
          <div class="carrousel-img">
            ${mediaFactory}
            <h2>${filterCurrent[imageID].title}</h2>
          </div>`);
  }
  return { getlightBoxCardDOM };
}
// changer class or function factory open close affichage prev next
