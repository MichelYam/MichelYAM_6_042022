import photographerFactory from '../factories/photographer.js';
// import { PhotographerApi } from '../api/api';

// const photographersList = new PhotographerApi('./data/photographers.json');
// console.log(photographersList);
const getPhotographers = async () => {
  // Penser à remplacer par les données récupérées dans le json
  const data = await fetch('../../data/photographers.json')
    .then((res) => res.json())
    .catch((req) => { throw new Error(req); });
  // et bien retourner le tableau photographers seulement une fois
  return data;
};

// const getPhotographers = async () => {
//   const photographerApi = new Api('../../data/photographers.json');
//   const photographerData = await photographerApi.get();
//   console.log(photographerData);
// };

const displayData = async (photographers) => {
  const photographersSection = document.querySelector('.photographer_section');
  photographersSection.innerHTML = photographerFactory(photographers).getUserCardDOM();
};

const init = async () => {
  const { photographers } = await getPhotographers();
  // Récupère les datas des photographes
  displayData(photographers);
};

init();
