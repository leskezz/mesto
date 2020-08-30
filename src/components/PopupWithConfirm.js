import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor (popupSelector){
        super(popupSelector);
    }

    setSubmitHandler(func) {
        this._handleFormSubmit = (evt) => {
            evt.preventDefault();
            func();
            this.close();
        }
        this._handleFormSubmit = this._handleFormSubmit.bind (this);
        this._popup.addEventListener('submit', this._handleFormSubmit)
    }

    removeSubmitHandler () {
        this._popup.removeEventListener('submit', this._handleFormSubmit);
    }

    close() {
        super.close();
        this.removeSubmitHandler();
    }

}