export class Card {
    constructor(cardData, cardSelector, handleCardClick) {
        this._cardName = cardData.name;
        this._cardLink = cardData.link;
        this._likes = cardData.likes.length;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    };

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _addCardListeners() {
        this._elementImage = this._element.querySelector('.element__image');
        this._elementHeading = this._element.querySelector('.element__heading');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._deleteButton = this._element.querySelector('.element__delete-button')

        this._deleteButton.addEventListener('click', () => this._element.remove());
        this._likeButton.addEventListener('click', () => this._likeButton.classList.toggle('element__like-button_active'));
        this._elementImage.addEventListener('click', () => this._handleFullSize());
    };

    _handleFullSize() {
        const data = {};
        data.link = this._elementImage.src;
        data.place = this._elementHeading.textContent;
        this._handleCardClick(data);
    };

    generateCard() {
        this._element = this._getTemplate();
        this._addCardListeners();

        this._elementLikes = this._element.querySelector('.element__like-count');
        
        this._elementHeading.textContent = this._cardName;
        this._elementImage.src = this._cardLink;
        this._elementImage.alt = this._cardName;
        this._elementLikes.textContent = this._likes;
        
        return this._element;
    }
}
