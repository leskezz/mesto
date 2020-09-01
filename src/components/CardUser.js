import Card from './Card.js';

export default class CardUser extends Card {

    constructor({cardData, cardSelector, handleCardClick, handlePutLike, handleDeleteLike, handleDeleteClick}){
        super({cardData, cardSelector, handleCardClick, handlePutLike, handleDeleteLike});
        this._handleDeleteClick = handleDeleteClick;
    }

    _addCardListeners() {
        super._addCardListeners();
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._element));
    }

}