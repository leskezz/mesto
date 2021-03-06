import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor (popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__item');
        this._popupForm = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__save-button');
    }

    _getInputValues () {
        this._formValues = {};
        this._inputList.forEach((input) => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formSubmitHandler = (evt) => {
            evt.preventDefault();
            const item = this._getInputValues();
            this._handleFormSubmit(item, this._submitButton);
        }
        this._popup.addEventListener('submit', this._formSubmitHandler)
    }

    close () {
        super.close();
        this._popupForm.reset();
    }

    _deleteEventListeners () {
        super._deleteEventListeners ();
        this._popup.removeEventListener('submit', this._formSubmitHandler)
    }
}