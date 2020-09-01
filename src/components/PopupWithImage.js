import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.card-full-size__image');
        this._popupCaption = this._popup.querySelector('.card-full-size__heading');
    }

    open (name, link) {
        super.open();
        this._popupImage.src = link;
        this._popupCaption.textContent = name;
    }
}