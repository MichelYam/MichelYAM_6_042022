import { photographerFactory } from '../factories/photographer';

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  await fetch('../../data/photographers.json')
    .then((res) => res.json())
    .catch((req) => console.log(req));
  // et bien retourner le tableau photographers seulement une fois
}
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');
  photographersSection.innerHTML = photographerFactory(photographers);
}

async function init() {
  const { photographers } = await getPhotographers();
  // Récupère les datas des photographes
  displayData(photographers);
}

init();
