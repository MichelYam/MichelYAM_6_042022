const closeLightModal = () => {
  const lightModal = document.getElementById('lightbox_modal');
  lightModal.style.display = 'none';
};
const displayMediaModal = (mediaID, filterCurrent, photographerName) => {
  const lightModal = document.getElementById('lightbox_modal');
  lightModal.style.display = 'block';
};
