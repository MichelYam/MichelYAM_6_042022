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

// get structure HTML of the user
const getUserMedias = async (photographerMedia, photographerName) => {
    const mediaSection = document.querySelector(".photographer_media_section");
    console.log(photographerMedia)
    mediaSection.innerHTML = photographerMediaList(photographerMedia, photographerName);
}

// display data of the user
const displayUserMedias = async () => {
    const { photographers, media } = await getPhotographers();
    const user_id = getIdOfUser();
    const photographerName = photographers.find(element => element.id == user_id).name.split(' ')[0].replace("-", " ");
    const photographerMedia = media.filter(element => element.photographerId == user_id);
    getUserMedias(photographerMedia, photographerName);

}
displayUserMedias()


// Filter

const filter = document.getElementById("media-select");

filter.addEventListener("change", async function () {
    const { photographers, media } = await getPhotographers();
    const user_id = getIdOfUser();
    const photographerName = photographers.find(element => element.id == user_id).name.split(' ')[0].replace("-", " ");
    const photographerMedia = media.filter(element => element.photographerId == user_id);
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



// let list = document.querySelectorAll('.list');
// let itemBox = document.querySelectorAll('.itemBox');

// for (let i = 0; i < list.length; i++) {
//     list[i].addEventListener('click', function () {
//         for (let j = 0; j < list.length; j++) {
//             list[j].classList.remove('active')
//         }
//         this.classList.add('active');

//         let dataFilter = this.getAttribute('data-filter')

//         for (let k = 0; k < itemBox.length; k++) {
//             itemBox[k].classList.remove("active")
//             itemBox[k].classList.add("hide")
//             if (itemBox[k].getAttribute('data-item') == dataFilter || dataFilter == 'all') {
//                 itemBox[k].classList.remove("hide")
//                 itemBox[k].classList.add("active")
//             }
//         }
//     })
// }