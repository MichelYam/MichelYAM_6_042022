async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    let data = [];
    await fetch('../../data/photographers.json').then(
        (res) => (data = res.json())
    ).catch(req => console.log(req));
    console.log(data)
    // et bien retourner le tableau photographers seulement une fois
    return data;
}
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographersSection.innerHTML = photographerFactory(photographers)
};

async function init() {
    const { photographers } = await getPhotographers();
    // Récupère les datas des photographes
    displayData(photographers);
};

init();
