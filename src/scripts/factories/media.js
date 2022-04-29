// class Media {
//     constructor(media) {
//         this._title = media.title
//         this._price = media.price
//         this._date = media.date
//         this._likes = media.likes
//     }
// }

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
