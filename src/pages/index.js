import photographerFactory from '../factories/photographer';
// import Api from '../api/api';

const getPhotographers = async () => {
  // Penser à remplacer par les données récupérées dans le json
  await fetch('../../data/photographers.json')
    .then((res) => res.json())
    .catch((req) => { throw new Error(req); });
  // et bien retourner le tableau photographers seulement une fois
};

// const getPhotographers = async () => {
//   const photographerApi = new Api('../../data/photographers.json');
//   const photographerData = await photographerApi.get();
//   console.log(photographerData);
// };

const displayData = async (photographers) => {
  const photographersSection = document.querySelector('.photographer_section');
  photographersSection.innerHTML = photographerFactory(photographers);
};

const init = async () => {
  const { photographers } = await getPhotographers();
  console.log(photographers);
  // Récupère les datas des photographes
  displayData(photographers);
};

init();
