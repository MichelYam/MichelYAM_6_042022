/* eslint max-classes-per-file: ["error", 4] */
// eslint-disable-next-line import/no-cycle
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
class MediaFactory {
  static getMediaType(media, photographerName) {
    const mediaElement = media.video === undefined
      ? new MediaImage(media, photographerName)
      : new MediaVideo(media, photographerName);
    return mediaElement;
  }
}

/**
 *get all information about photographer
 * @param {array} photographer
 * @returns
 */
export function photographerDetail(photographer) {
  return (`
    <div class="photographer-text">
        <h1>${photographer.name}</h1>
        <h2>${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p>
        <div class="price"><div> 297 081 <i class="fas fa-heart"></i></div>${photographer.price}€/jour</div>
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
    span.textContent = likes;
    span.appendChild(i);

    // button_element.setAttribute('onclick', 'doSomething();');
    const mediaAssets = document.createElement('div');
    mediaAssets.innerHTML = mediaFactory;
    mediaAssets.setAttribute('class', 'photographer-media');
    mediaAssets.setAttribute('onclick', `displayLigthModal(${id})`);

    const div = document.createElement('div');
    div.append(h2, span);

    const divContainer = document.createElement('div');
    divContainer.setAttribute('class', 'medial-container');
    divContainer.append(mediaAssets);
    divContainer.append(div);

    return divContainer;
  }
  return { getMediasCardDOM };
}

export function lightboxFactory(filterCurrent, photographerInfo, imageID) {
  const photographerName = photographerInfo.name.split(' ')[0].replace('-', ' ');
  function getlightBoxCardDOM() {
    return (` 
          <div class="carrousel-img">
          ${filterCurrent[imageID].video === undefined
        ? `<img src="./assets/images/media/${photographerName}/${filterCurrent[imageID].image}" alt="${photographerName} ${filterCurrent[imageID].image}" />`
        : `<video controls>
                    <source src="./assets/images/media/${photographerName}/${filterCurrent[imageID].video}" type="video/mp4" />
                </video>`
      }
            <h2>${filterCurrent[imageID].title}</h2>
          </div>`);
  }
  return { getlightBoxCardDOM };
}
