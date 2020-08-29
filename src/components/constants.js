const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const emptyElement = document.querySelector('.element_empty');
const profileForm = document.forms.formEditProfile;
const addCardForm = document.forms.formAddElement;
const inputName = document.querySelector('.popup__item_el_name');
const inputProfession = document.querySelector('.popup__item_el_profession');

const myConfig = {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error_active'
};

export {editButton, addCardButton, emptyElement, profileForm, addCardForm, myConfig, inputName, inputProfession};