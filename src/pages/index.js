import photographerFactory from '../factories/photographer.js';
import PhotographerApi from '../api/api.js';

/**
 * get all photographer from api
 * @returns {array}
 */
const getPhotographersApi = async () => {
  const photographerApi = new PhotographerApi('../../data/photographers.json');
  const photographerData = await photographerApi.getPhotographers();
  return photographerData;
};

/**
 * return photographer HTML structure
 * @param {array} photographers
 */
const displayData = async (photographers) => {
  const photographersSection = document.querySelector('.photographer_section');
  photographersSection.innerHTML = photographerFactory(photographers).getUserCardDOM();
};

const init = async () => {
  const photographers = await getPhotographersApi();
  // Récupère les datas des photographes
  displayData(photographers);
};

init();
