const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const addCardButton = content.querySelector('.profile__add-button');
const popupEditProfile = content.querySelector('.popup_btn_edit-profile');
const popupAddCard = content.querySelector('.popup_btn_add-element');
const closeButtonPopupEditProfile = popupEditProfile.querySelector('.popup__close-button');
const closeButtonPopupAddCard = popupAddCard.querySelector('.popup__close-button');
const popupCardFullSize = content.querySelector('.popup_btn_card-image');
const closeButtonPopupCardFullSize = popupCardFullSize.querySelector('.popup__close-button');
const cardsListElement = content.querySelector('.elements__grid');
const emptyElement = content.querySelector('.element_empty');
const profileName = content.querySelector('.profile__name');
const profileProfession = content.querySelector('.profile__profession');
const inputName = popupEditProfile.querySelector('.popup__item_el_name');
const inputProfession = popupEditProfile.querySelector('.popup__item_el_profession');
const inputPlace = popupAddCard.querySelector('.popup__item_el_place');
const inputLink = popupAddCard.querySelector('.popup__item_el_link');
const popupCardImage = popupCardFullSize.querySelector('.card-full-size__image');
const popupCardHeading = popupCardFullSize.querySelector('.card-full-size__heading');

function clearForm(popup) {
    if (!popup.classList.contains('popup_btn_card-image')) {
        const inputList = Array.from(popup.querySelectorAll(myConfig.inputSelector));
        const buttonElement = popup.querySelector(myConfig.submitButtonSelector);
        const formElement = popup.querySelector('.popup__form');
        inputList.forEach((inputElement) => {
            const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
            inputElement.classList.remove(myConfig.inputErrorClass);
            errorElement.classList.remove(myConfig.errorClass);
            errorElement.textContent = '';
        });
        const hasInvalidInput = inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
        if (hasInvalidInput) {
            buttonElement.classList.add(myConfig.inactiveButtonClass);
            buttonElement.disabled = true;
          } else {
            buttonElement.classList.remove(myConfig.inactiveButtonClass);
            buttonElement.disabled = false;
          };
    };
};

function openPopup(popup) {

    popup.classList.add('popup_opened');

    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    inputPlace.value = '';
    inputLink.value = '';

    addOverlayListeners(popup);
    clearForm(popup);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeOverlayListeners(popup);
};

function formEditProfileSubmitHandler (evt) {
    
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    
    closePopup(popupEditProfile);
};

class Card {
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

function addCard(cardData) {
    const card = new Card (cardData, '.element-template');
    const cardElement = card.generateCard();
    emptyElement.remove();
    cardsListElement.prepend(cardElement);
};

initialCards.forEach(cardData => {
    addCard(cardData);
});

function formAddCardSubmitHandler (evt) {
    evt.preventDefault();
    const newCard = {};
    newCard.name = inputPlace.value;
    newCard.link = inputLink.value;
    inputPlace.value = '';
    inputLink.value = '';
    addCard(newCard);
    closePopup(popupAddCard);
};

function closePopupOnOverlay (evt) {
    const overlay = evt.target;
    if (overlay.classList.contains('popup')) {
        closePopup(overlay);
    }
};

function closePopupOnEscape (evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    } 
};

function addOverlayListeners (popup) {
        popup.addEventListener('click', closePopupOnOverlay);
        window.addEventListener('keydown', closePopupOnEscape);
};

function removeOverlayListeners (popup) {
        popup.removeEventListener('click', closePopupOnOverlay);
        window.removeEventListener('keydown', closePopupOnEscape);
};

popupEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
editButton.addEventListener('click', () => { openPopup(popupEditProfile);});
closeButtonPopupEditProfile.addEventListener('click', () => { closePopup(popupEditProfile);});
closeButtonPopupAddCard.addEventListener('click', () => { closePopup(popupAddCard);});
addCardButton.addEventListener('click', () => { openPopup(popupAddCard);});
popupAddCard.addEventListener('submit', formAddCardSubmitHandler);
closeButtonPopupCardFullSize.addEventListener('click', () => { closePopup(popupCardFullSize); });
