export default class Popup {
    
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open () {
        this._popup.classList.add('popup_opened');
        this._escHandler = this._handleEscClose.bind (this);
        this._overlayHandler = this._handleOverlayClose.bind(this);
        this._clickHandler = this.close.bind(this);
        this.setEventListeners()
    }

    close () {
        this._popup.classList.remove('popup_opened');
        this._deleteEventListeners();
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
            this.close();
        } 
    }

    _handleOverlayClose (evt) {
        const overlay = evt.target;
        if (overlay.classList.contains('popup')) {
        this.close();
    }
    }

    setEventListeners () {
        this._popup.addEventListener('click', this._overlayHandler);
        this._popup.querySelector('.popup__close-button').addEventListener('click', this._clickHandler);
        document.addEventListener('keydown', this._escHandler);
    }

    _deleteEventListeners () {
        this._popup.removeEventListener('click', this._overlayHandler);
        this._popup.querySelector('.popup__close-button').removeEventListener('click', this._clickHandler);
        document.removeEventListener('keydown', this._escHandler);
    }
    
}