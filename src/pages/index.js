import './index.css';
import {Card} from '../components/Card.js';
import {initialCards} from '../components/utils.js';
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, addCardButton, emptyElement, profileForm, addCardForm, myConfig, inputName, inputProfession} from '../components/constants.js';

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
    (newElement) => {
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
    inputName.value = user.name;
    inputProfession.value = user.profession;
    profileFormValidator.clearForm();
})
