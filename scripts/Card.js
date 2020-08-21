export class Card {
    constructor(cardData, cardSelector, handleCardClick) {
        this._cardName = cardData.place;
        this._cardLink = cardData.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
            this._handleFullSize(evt)
        });
    };
    
    _handleDelete (evt) {
        const card = evt.target.closest('.element');
        card.remove();
    };

    _handleFullSize(evt) {
        const element = evt.target.closest('.element');
        const elementHeading = element.querySelector('.element__heading');
        const data = {};
        data.link = evt.target.src;
        data.place = elementHeading.textContent;
        this._handleCardClick(data);
    };
    
    _handleLike (evt) {
        evt.target.classList.toggle('element__like-button_active');
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
