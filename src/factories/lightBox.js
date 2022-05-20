/* eslint-disable max-len */
// eslint-disable-next-line import/no-cycle
import { MediaFactory } from './media.js';

export default class Lightbox {
  constructor(filter, mediaID, photographerName) {
    this.filter = filter;
    this.mediaID = mediaID;
    this.photographerName = photographerName;
    this.contentLightBox = document.querySelector('.caroussel-content');

    this.lightBox = document.getElementById('lightbox-modal');
    this.body = document.querySelector('body');
    this.main = document.querySelector('main');
  }

  render() {
    const lightBox = document.getElementById('lightbox-modal');
    lightBox.classList.add('active');
    this.mediaCurrent = this.filter.find((media) => media.id === this.mediaID);
    this.mediaCurrentID = this.filter.indexOf(this.mediaCurrent);
    const lightboxContent = this.getMediasCardDOM(this.mediaCurrentID);
    lightBox.setAttribute('aria-hidden', 'false');
    this.body.classList.add('no-scroll');
    this.main.style.display = 'none';
    this.contentLightBox.innerHTML = lightboxContent;
    const leftArrow = document.querySelector('.carousel__button--prev');
    const rightArrow = document.querySelector('.carousel__button--next');
    document.querySelector('.close').addEventListener('click', () => {
      this.close();
    });
    leftArrow.addEventListener('click', () => {
      this.previousImage();
    });

    rightArrow.addEventListener('click', () => {
      this.nextImage();
    });

    document.addEventListener('keyup', (e) => {
      this.handleEvent(e);
    });
  }

  /**
 * close modal lightBox
 */
  close() {
    this.lightBox.classList.remove('active');
    this.lightBox.setAttribute('aria-hidden', 'true');
    this.body.classList.remove('no-scroll');
    this.main.style.display = 'block';
  }

  /**
 * handle navigation Lightbox (next)
 * @returns id
 */
  nextImage() {
    if (this.mediaCurrentID === this.filter.length - 1) {
      this.mediaCurrentID = 0;
    } else {
      this.mediaCurrentID += 1;
    }
    this.contentLightBox.innerHTML = this.getMediasCardDOM(this.mediaCurrentID);
    return this.mediaCurrentID;
  }

  /**
 * handle navigation Lightbox (previous)
 * @returns
 */
  previousImage() {
    if (this.mediaCurrentID === 0) {
      this.mediaCurrentID = this.filter.length - 1;
    } else {
      this.mediaCurrentID -= 1;
    }
    this.contentLightBox.innerHTML = this.getMediasCardDOM(this.mediaCurrentID);
    return this.mediaCurrentID;
  }

  /**
   * get lightBox content
   * @param {id} mediaCurrentID
   * @returns htmlElement
   */
  getMediasCardDOM(mediaCurrentID) {
    const mediaFactory = MediaFactory.getMediaType(this.filter[mediaCurrentID], this.photographerName);
    return (`
      <div class="carrousel-media">
        ${mediaFactory}
        <h2>${this.filter[mediaCurrentID].title}</h2>
        </div>
        `);
  }

  /**
 * handle keyboards navigation
 * @param {*} e
 */
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
