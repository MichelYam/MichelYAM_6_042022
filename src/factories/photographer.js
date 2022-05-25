/**
 *returns the HTML structure of all photographer in database
 * @param {array} data
 * @returns
 */
export default function photographerFactory(data) {
  function getUserCardDOM() {
    return data.map((photographer) => (
      `<article>
            <a href="./photographer.html?id=${photographer.id}" aria-label="lien vers ${photographer.name} ">
                <img src="./assets/photographers/${photographer.portrait}" alt="${photographer.name}"/>
                <h2>${photographer.name}</h2>
            </a>
            <div>
                <h3 aria-label="zone de travail ${photographer.city}, ${photographer.country}">${photographer.city}, ${photographer.country}</h3>
                <p aria-label = "description ${photographer.tagline}">${photographer.tagline}</p>
                <p class="price" aria-label="le cout est de  ${photographer.price}€ par jour">${photographer.price}€/jour</p>
            </div>
        </article>`
    )).join('');
  }
  return { getUserCardDOM };
}
