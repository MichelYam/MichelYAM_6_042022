/**
 *returns the HTML structure of all photographer in database
 * @param {array} data
 * @returns
 */
export default function photographerFactory(data) {
  function getUserCardDOM() {
    return data.map((photographer) => (
      `<article>
            <a href="./photographer.html?id=${photographer.id}">
                <img src="./assets/photographers/${photographer.portrait}" alt="photo_de_${photographer.name}"/>
                <h2>${photographer.name}</h2>
            </a>
            <div>
                <h3>${photographer.city}, ${photographer.country}</h3>
                <p>${photographer.tagline}</p>
                <p class="price">${photographer.price}€/jour</p>
            </div>
        </article>`
    )).join('');
  }
  return { getUserCardDOM };
}
