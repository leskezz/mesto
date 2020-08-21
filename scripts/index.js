import {Card} from './Card.js';
import {initialCards} from './utils.js';
import {FormValidator} from './FormValidator.js'
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const addCardButton = content.querySelector('.profile__add-button');
const emptyElement = content.querySelector('.element_empty');
const profileForm = document.forms.formEditProfile;
const addCardForm = document.forms.formAddElement;

const myConfig = {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error_active'
};

const userInfo = new UserInfo (
    '.profile__name',
    '.profile__profession'
);

const popupFullSizeCard = new PopupWithImage ('.popup_btn_card-image');

const popupEditProfile = new PopupWithForm (
    '.popup_btn_edit-profile',
    (item) => {
        userInfo.setUserInfo(item);
    });

const popupAddCard = new PopupWithForm (
    '.popup_btn_add-element',
    (newCard) => {
        const newCardsList = new Section ({
            items: newCard,
            renderer: (item) => {
                const card = new Card (
                    item, 
                    '.element-template', 
                    () => {
                        popupFullSizeCard.open(item);
                    }
                );
                const cardElement = card.generateCard();
                cardsList.addItem (cardElement);
            }
        },
        '.elements__grid'
        )
    
        newCardsList.renderItems();
    }
    );

const profileFormValidator = new FormValidator (myConfig, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator (myConfig, addCardForm);
addCardFormValidator.enableValidation();

const cardsList = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card (
            item, 
            '.element-template', 
            () => {
                popupFullSizeCard.open(item);
            }
        );
        const cardElement = card.generateCard();
        emptyElement.remove();
        cardsList.addItem (cardElement);
    }
},
'.elements__grid'
)

cardsList.renderItems();

addCardButton.addEventListener('click', () => { 
    popupAddCard.open();
    addCardFormValidator.clearForm();
});

editButton.addEventListener('click', () => {
    popupEditProfile.open();
    const user = userInfo.getUserInfo();
    document.querySelector('.popup__item_el_name').value = user.name;
    document.querySelector('.popup__item_el_profession').value = user.profession;
    profileFormValidator.clearForm();
})
