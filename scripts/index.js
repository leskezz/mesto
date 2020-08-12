import {Card} from './Card.js';
import {initialCards, openPopup, popupCardFullSize, closePopup, addOverlayListeners} from './utils.js';
import {FormValidator} from './FormValidator.js'

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const addCardButton = content.querySelector('.profile__add-button');
const popupEditProfile = content.querySelector('.popup_btn_edit-profile');
const popupAddCard = content.querySelector('.popup_btn_add-element');
const closeButtonPopupEditProfile = popupEditProfile.querySelector('.popup__close-button');
const closeButtonPopupAddCard = popupAddCard.querySelector('.popup__close-button');
const closeButtonPopupCardFullSize = popupCardFullSize.querySelector('.popup__close-button');
const cardsListElement = content.querySelector('.elements__grid');
const emptyElement = content.querySelector('.element_empty');
const profileName = content.querySelector('.profile__name');
const profileProfession = content.querySelector('.profile__profession');
const inputName = popupEditProfile.querySelector('.popup__item_el_name');
const inputProfession = popupEditProfile.querySelector('.popup__item_el_profession');
const inputPlace = popupAddCard.querySelector('.popup__item_el_place');
const inputLink = popupAddCard.querySelector('.popup__item_el_link');
const profileForm = document.forms.formEditProfile;
const addCardForm = document.forms.formAddElement;

const myConfig = {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error_active'
  };

function formEditProfileSubmitHandler (evt) {
    
    evt.preventDefault();

    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    
    closePopup(popupEditProfile);
};

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

const profileFormValidator = new FormValidator (myConfig, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator (myConfig, addCardForm);
addCardFormValidator.enableValidation();

popupEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
editButton.addEventListener('click', () => { 
    openPopup(popupEditProfile);
    profileFormValidator.clearForm();
    addOverlayListeners(popupEditProfile);
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
});
closeButtonPopupEditProfile.addEventListener('click', () => { closePopup(popupEditProfile);});
closeButtonPopupAddCard.addEventListener('click', () => { closePopup(popupAddCard);});
addCardButton.addEventListener('click', () => { 
    openPopup(popupAddCard);
    addCardFormValidator.clearForm();
    addOverlayListeners(popupAddCard);
    inputPlace.value = '';
    inputLink.value = '';
});
popupAddCard.addEventListener('submit', formAddCardSubmitHandler);
closeButtonPopupCardFullSize.addEventListener('click', () => { closePopup(popupCardFullSize); });
