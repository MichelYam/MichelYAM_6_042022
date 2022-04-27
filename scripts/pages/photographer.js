//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    let data = [];
    await fetch('../../data/photographers.json').then(
        (res) => (data = res.json())
    ).catch(req => console.log(req));
    return data;
}
// get user ID from url
const getIdOfUser = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    return id;
}

const getUserInfo = async () => {
    const userID = getIdOfUser()
    const { photographers } = await getPhotographers();
    const photographerInfo = photographers.find(element => element.id == userID);
    return photographerInfo;
}

// display data of the user
const displayUserData = async () => {
    const photographerInfo = await getUserInfo()
    const photographerSection = document.querySelector(".photograph-header");
    photographerSection.innerHTML = photographerDetail(photographerInfo);
}

displayUserData()


// <----- media ----->
const getUserMediaByID = async (userID) => {
    const { media } = await getPhotographers();
    const photographerMedia = media.filter(element => element.photographerId == userID);
    return photographerMedia;
}
// get structure HTML of the user
const getUserMedias = async (photographerMedia, photographerName) => {
    const mediaSection = document.querySelector(".photographer_media_section");
    mediaSection.innerHTML = photographerMediaList(photographerMedia, photographerName);
}

// display data of the user
const displayUserMedias = async () => {
    const { photographers } = await getPhotographers();
    const userID = getIdOfUser();
    const photographerMedia = await getUserMediaByID(userID);
    const photographerName = photographers.find(element => element.id == userID).name.split(' ')[0].replace("-", " ");
    getUserMedias(photographerMedia, photographerName);

}
displayUserMedias()


// Filter

const filter = document.getElementById("media-select");
const getFilterByDate = () => {

}
filter.addEventListener("change", async function () {
    const { photographers } = await getPhotographers();
    const userID = getIdOfUser();
    const photographerName = photographers.find(element => element.id == userID).name.split(' ')[0].replace("-", " ");
    const photographerMedia = await getUserMediaByID(userID)
    switch (filter.value) {
        case "popularity":
            const filterByPopularity = photographerMedia.sort((a, b) => b.likes - a.likes);
            // console.log(filterByPopularity);
            getUserMedias(filterByPopularity, photographerName);
            break;
        case "date":
            const filterByDate = photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
            // console.log(filterByDate);
            getUserMedias(filterByDate, photographerName);
            break;
        case "title":
            const filterByTitle = photographerMedia.sort((a, b) => a.title < b.title ? -1 : 1);
            // console.log(filterByTitle);
            getUserMedias(filterByTitle, photographerName);
            break;
    }
})
