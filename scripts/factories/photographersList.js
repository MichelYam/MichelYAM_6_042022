function photographerDetail(photographer) {
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
    `)
}

function photographerMediaList(media, photographerName) {
    return media.map((media) => (`
        <div class="medial-container">
                ${media.video == undefined ?
            `<img onclick="displayLigthModal(${media.id})" src="./assets/images/media/${photographerName}/${media.image}" alt="${photographerName} ${media.image}" />`
            :
            `<video controls>
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
    `)).join('')
}