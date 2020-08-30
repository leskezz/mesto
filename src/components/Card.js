export default class Card {
    constructor({cardData, cardSelector, handleCardClick, handleLikeClick}) {
        this._cardName = cardData.name;
        this._cardLink = cardData.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._id = cardData._id;
        this._isLiked = cardData.likes.some((item) => {
            return item._id === 'c13cab8ef5f2b7807fb881bf'
        })
        this._likes = cardData.likes.length;
        this._handleLikeClick = handleLikeClick;
    };

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    _handleLike () {
        this._likeButton.classList.toggle('element__like-button_active');
        this._handleLikeClick(this._element);
    }

    _addCardListeners() {
        this._elementImage = this._element.querySelector('.element__image');
        this._elementHeading = this._element.querySelector('.element__heading');
        this._likeButton = this._element.querySelector('.element__like-button');

        this._likeButton.addEventListener('click', () => this._handleLike());
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
        this._element.id = this._id;
        if (this._isLiked) {
            this._likeButton.classList.add('element__like-button_active');
        }
        this._element.querySelector('.element__like-count').textContent = this._likes;
        return this._element;
    }
}
