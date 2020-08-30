import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor (popupSelector, handleFormSubmit){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setSubmitHandler(func) {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            func();
            this.close();
        })
    }


}