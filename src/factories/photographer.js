export default function photographerFactory(data) {
  function getUserCardDOM() {
    return data.map((photographer) => (
      `<article>
            <a href="./photographer.html?id=${photographer.id}">
                <img src="../assets/images/photographers/${photographer.portrait}" alt="photo_de_${photographer.name}"/>
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

// function photographerFactory(data) {
//   const { name, portrait } = data;

//   const picture = `assets/photographers/${portrait}`;

//   function getUserCardDOM() {
//       const article = document.createElement( 'article' );
//       const img = document.createElement( 'img' );
//       img.setAttribute("src", picture)
//       const h2 = document.createElement( 'h2' );
//       h2.textContent = name;
//       article.appendChild(img);
//       article.appendChild(h2);
//       return (article);
//   }
//   return { name, picture, getUserCardDOM }
// }
