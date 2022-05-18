// eslint-disable-next-line import/no-cycle
import { MediaFactory } from './media.js';

export default class Lightbox {
  constructor(filter, mediaID, photographerName) {
    this.filter = filter;
    this.mediaID = mediaID;
    this.photographerName = photographerName;
    this.contentLightBox = document.querySelector('.caroussel-content');

    this.lightBox = document.getElementById('lightbox-modal');
  }

  init() {
    this.mediaCurrent = this.filter.find((media) => media.id === this.mediaID);
    this.mediaCurrentID = this.filter.indexOf(this.mediaCurrent);
    this.getMediaData();
    const lightboxContent = this.getMediasCardDOM(this.mediaCurrentID);
    this.contentLightBox.innerHTML = lightboxContent;
    const leftArrow = document.querySelector('.carousel__button--prev');
    const rightArrow = document.querySelector('.carousel__button--next');
    document.querySelector('.close').addEventListener('click', () => {
      this.close();
    });
    leftArrow.addEventListener('click', () => {
      // console.log('gauche')
      this.previousImage();
    });

    rightArrow.addEventListener('click', () => {
      // console.log('droite')
      this.nextImage();
    });

    document.addEventListener('keyup', (e) => {
      this.handleEvent(e);
    });

    const video = document.querySelector('.carrousel-media video');
    video.setAttribute('controls', 'controls');
  }

  close() {
    this.lightBox.classList.remove('active');
    this.lightBox.setAttribute('aria-hidden', 'true');
  }

  getMediaData() {
    const lightBox = document.getElementById('lightbox-modal');
    lightBox.classList.add('active');
  }

  nextImage() {
    if (this.mediaCurrentID === this.filter.length - 1) {
      this.mediaCurrentID = 0;
    } else {
      this.mediaCurrentID += 1;
    }
    this.contentLightBox.innerHTML = this.getMediasCardDOM(this.mediaCurrentID);
    return this.mediaCurrentID;
  }

  previousImage() {
    if (this.mediaCurrentID === 0) {
      this.mediaCurrentID = this.filter.length - 1;
    } else {
      this.mediaCurrentID -= 1;
    }
    this.contentLightBox.innerHTML = this.getMediasCardDOM(this.mediaCurrentID);
    return this.mediaCurrentID;
  }

  getMediasCardDOM(mediaCurrentID) {
    const mediaFactory = MediaFactory.getMediaType(this.filter[mediaCurrentID], this.photographerName);
    return (`
      <div class="carrousel-media">
        ${mediaFactory}
        <h2>${this.filter[mediaCurrentID].title}</h2>
      </div>`);
  }

  handleEvent(e) {
    if (e.key === 'ArrowLeft') {
      this.previousImage();
    } else if (e.key === 'ArrowRight') {
      this.nextImage();
    } else if (e.key === 'Escape') {
      this.close();
    }
  }
}
