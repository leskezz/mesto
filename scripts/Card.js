import {popupCardImage, popupCardHeading, openPopup, popupCardFullSize} from './utils.js';

export class Card {
    constructor(cardData, cardSelector) {
        this._cardName = cardData.name;
        this._cardLink = cardData.link;
        this._cardSelector = cardSelector;
    };

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
        return cardElement;
    }

    _addCardListeners() {
        this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
            this._handleDelete(evt);
        });
        this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
            this._handleLike(evt);
        });
        this._element.querySelector('.element__image').addEventListener('click', (evt) => {
            this._openPopupCard(evt);
        });
    };
    
    _handleDelete (evt) {
        const card = evt.target.closest('.element');
        card.remove();
    };
    
    _handleLike (evt) {
        evt.target.classList.toggle('element__like-button_active');
    };

    _openPopupCard (evt) {
        popupCardImage.src = evt.target.src;
        const card = evt.target.closest('.element');
        const heading = card.querySelector('.element__heading');
        popupCardHeading.textContent = heading.textContent;
        openPopup(popupCardFullSize);
    };

    generateCard() {
        this._element = this._getTemplate();
        this._addCardListeners();

        this._element.querySelector('.element__heading').textContent = this._cardName;
        const cardImage = this._element.querySelector('.element__image');
        cardImage.src = this._cardLink;
        cardImage.alt = this._cardName;

        return this._element;
    }
}
