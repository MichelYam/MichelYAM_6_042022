class MediaFactory {
  constructor(media, type) {
    /* eslint no-underscore-dangle: 0 */
    this._image = media.image;
    this._video = media.video;
    this._type = type;
  }

  static mediaType() {
    const mediaElement = this._type;
    const element = mediaElement ? new MediaImage() : new MediaVideo();
    return element;
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
        <img src="./assets/images/photographers/${photographer.portrait}" alt="${photographer.name}"/>
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
  return media.map(() => (`
        <div class="medial-container">
                ${media.video === undefined
      ? `<img onclick="displayMediaModal(${media.id})" src="./assets/images/media/${photographerName}/${media.image}" alt="${photographerName} ${media.image}" />`
      : `<video>
                    <source src="../assets/images/media/${photographerName}/${media.video}" type="video/webm" />
                    <source src="../assets/images/media/${photographerName}/${media.video}" type="video/mp4" />
            </video>`
    }
                <div>
                    <h2>${media.title}</h2>
                    <span>${media.likes}<i class="fas fa-heart"></i></span>
                </div>
            </div>
        </div>
    `)).join('');
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
