import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.card-full-size__image');
        this._popupCaption = this._popup.querySelector('.card-full-size__heading');
    }

    open (item) {
        super.open();
        this._popupImage.src = item.link;
        this._popupCaption.textContent = item.name;
    }
}