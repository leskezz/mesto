import Card from './Card.js';

export default class CardServer extends Card {
    constructor(cardData, cardSelector, handleCardClick) {
        super(cardData, cardSelector, handleCardClick);
        this._likes = cardData.likes.length;
    };

    _getTemplate(){
        const cardElement = super._getTemplate();
        cardElement.querySelector('.element__delete-button').remove();
        return cardElement;
    }

    generateCard() {
        super.generateCard();
        this._element.querySelector('.element__like-count').textContent = this._likes;
        return this._element;
    }

}