import './index.css';
import {Card} from '../components/Card.js';
import {initialCards} from '../components/utils.js';
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, addCardButton, emptyElement, profileForm, addCardForm, myConfig, inputName, inputProfession, avatar} from '../components/constants.js';

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

const createCard = (newElement) => {
    const newCard = new Card (
        newElement, 
        '.element-template', 
        (item) => {
            popupFullSizeCard.open(item);
            }
        );
        const cardElement = newCard.generateCard();
        cardsList.addItem (cardElement);
}

const popupAddCard = new PopupWithForm (
    '.popup_btn_add-element',
    (newElement) => {
        createCard(newElement)
            }
    );

const profileFormValidator = new FormValidator (myConfig, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator (myConfig, addCardForm);
addCardFormValidator.enableValidation();

const cardsList = new Section ({
    items: initialCards,
    renderer: (newElement) => {
        createCard(newElement);
        emptyElement.remove();
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
    inputName.value = user.name;
    inputProfession.value = user.profession;
    profileFormValidator.clearForm();
})

fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
    headers: {
        authorization: 'b9ca3f7b-fe22-468a-8861-4b4eef5a6009'
    }
})
    .then(res => res.json())
    .then((data) => {
        console.log(data); // НЕ ЗАБУДЬ УБРАТЬ
        const user = {};
        user.name = data.name;
        user.profession = data.about;
        userInfo.setUserInfo(user);
        avatar.src = data.avatar;
    })
