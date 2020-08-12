import {Card} from './Card.js';
import {initialCards, openPopup, popupCardFullSize} from './utils.js';
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
const formList = document.querySelectorAll('.popup__form');

const myConfig = {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error_active'
  };

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
/*
export function openPopup(popup) {

    popup.classList.add('popup_opened');

    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    inputPlace.value = '';
    inputLink.value = '';

    addOverlayListeners(popup);
    clearForm(popup);
}; */

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

formList.forEach ((formElement) => {
    const formValidate = new FormValidator (myConfig, formElement);
    formValidate.enableValidation();
  })

popupEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
editButton.addEventListener('click', () => { openPopup(popupEditProfile);});
closeButtonPopupEditProfile.addEventListener('click', () => { closePopup(popupEditProfile);});
closeButtonPopupAddCard.addEventListener('click', () => { closePopup(popupAddCard);});
addCardButton.addEventListener('click', () => { openPopup(popupAddCard);});
popupAddCard.addEventListener('submit', formAddCardSubmitHandler);
closeButtonPopupCardFullSize.addEventListener('click', () => { closePopup(popupCardFullSize); });
