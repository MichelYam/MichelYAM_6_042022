/* eslint max-classes-per-file: ["error", 4] */
class MediaImage {
  constructor(media, photographerName) {
    this._image = media.image;
    this._photographerName = photographerName;
  }

  render() {
    return `<img onclick="displayMediaModal(${this._id})"
            src="./assets/images/media/${this._photographerName}/${this._image}"
            alt="${this._photographerName} ${this._image}" />`;
  }
}

class MediaVideo {
  constructor(media, photographerName) {
    this._video = media.video;
    this._photographerName = photographerName;
  }

  render() {
    return `<video><source src="../assets/images/media/${this._photographerName}/${this._video}"
            type="video/mp4" /></video>`;
  }
}

class MediaFactory {
  constructor(media, photographerName) {
    /* eslint no-underscore-dangle: 0 */
    this._video = media.video;
    this._image = media.image;
    this._photographerName = photographerName;
    /* eslint no-constructor-return: "error" */
    if (this._image) {
      return new MediaImage(this._media, this._photographerName);
    } if (this._video) {
      return new MediaVideo(this._media, this._photographerName);
    }
    throw 'Unknown type format';
  }

  // getMediaType() {
  //   const mediaElement = this._type;
  //   const element = mediaElement ? new MediaImage(this._media, this._photographerName)
  //     : new MediaVideo(this._media, this._photographerName);
  //   return element;
  // }
}

// class Media {
//   constructor(media, photographerName) {
//     this._title = media.title;
//     this._id = media.id;
//     this._price = media.price;
//     this._like = media.like;
//     this._photographerId = media.photographerId;
//     this._photographerName = photographerName;
//   }

//   getLike() {
//     return this._like;
//   }
// }
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
  const {
    likes, image, video, title,
  } = media;
  const mediaFactory = new MediaFactory(media, photographerName);
  console.log(mediaFactory.getMediaType());
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

    const div = document.createElement('div');
    div.append(h2, span);

    const divContainer = document.createElement('div');
    divContainer.setAttribute('class', 'medial-container');
    divContainer.append(div);
    return divContainer;
  }
  // function getMediasCardDOM() {
  //   const article = document.createElement('article');
  //   const img = document.createElement('img');
  //   img.setAttribute('src', picture);
  //   const h2 = document.createElement('h2');
  //   h2.textContent = name;
  //   article.appendChild(img);
  //   article.appendChild(h2);
  //   return (article);
  // }
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
