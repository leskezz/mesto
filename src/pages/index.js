import './index.css';
import Card from '../components/Card.js';
import CardUser from '../components/CardUser.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, addCardButton, emptyElement, profileForm, addCardForm, myConfig, inputName, inputProfession, editAvatarButton, editAvatarForm} from '../utils/constants.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import {renderLoading} from '../utils/utils.js';

const userInfo = new UserInfo (
    '.profile__name',
    '.profile__profession',
    '.profile__photo'
);

const popupFullSizeCard = new PopupWithImage ('.popup_btn_card-image');

const popupEditProfile = new PopupWithForm (
    '.popup_btn_edit-profile',
    (item, button) => {
        renderLoading({button, isLoading: true, initialText: 'Сохранить'});
        api.patchProfile('/users/me', item)
            .then ((data) => {
                userInfo.setUserInfo(data);
                popupEditProfile.close();
            })
            .catch (err => console.log(err))
            .finally(() => renderLoading({button, isLoading: false, initialText: 'Сохранить'}))
    }
);

const popupDeleteCard = new PopupWithConfirm (
    '.popup_btn_delete-element'
);

const popupEditAvatar = new PopupWithForm (
    '.popup_btn_edit-avatar',
    (newAvatar, button) => {
        renderLoading({button, isLoading: true, initialText: 'Сохранить'});
        api.patchAvatar('/users/me/avatar', newAvatar.avatar)
            .then((data) => {
                userInfo.setAvatar(data);
                popupEditAvatar.close();
            })
            .catch (err => console.log(err))
            .finally(() => renderLoading({button, isLoading: false, initialText: 'Сохранить'}))
    }
);

const popupAddCard = new PopupWithForm (
    '.popup_btn_add-element',
    (newElement, button) => {
        renderLoading({button, isLoading: true, initialText: 'Создать'});
        api.postNewCard('/cards', newElement)
            .then ((data) => {
                createCardUser(data);
                popupAddCard.close();
            })
            .catch (err => console.log(err))
            .finally(() => renderLoading({button, isLoading: false, initialText: 'Создать'}))
    }
);

const handleDeleteClick = (element) => {
    popupDeleteCard.open();
    const deleteHandler = () => {
        api.deleteCard('/cards', element)
            .then ((data) => {
                console.log(data);
                element.remove();
                popupDeleteCard.close();
            })
            .catch (err => console.log(err));
    }
    popupDeleteCard.setSubmitHandler(deleteHandler)
}


const createCardUser = (newElement) => {
    const newCard = new CardUser ({
        cardData: newElement, 
        cardSelector: '.element-template', 
        handleCardClick: (name, link) => {
            popupFullSizeCard.open(name, link);
            },
        handlePutLike: (cardId) => {
            return api.putLike('/cards/likes', cardId)
        },
        handleDeleteLike: (cardId) => {
            return api.deleteLike('/cards/likes', cardId)
        },
        handleDeleteClick: handleDeleteClick
    });
        const cardElement = newCard.generateCard();
        cardsList.addItem (cardElement);
}

const createCardServer = (newElement) => {
    const newCard = new Card ({
        cardData: newElement, 
        cardSelector: '.element-template', 
        handleCardClick: (name, link) => {
            popupFullSizeCard.open(name, link);
            },
        handlePutLike: (cardId) => {
                return api.putLike('/cards/likes', cardId)
            },
        handleDeleteLike: (cardId) => {
                return api.deleteLike('/cards/likes', cardId)
            },
    });
        const cardElement = newCard.generateCard();
        cardElement.querySelector('.element__delete-button').remove();
        cardsList.addItem (cardElement);
}

const cardsList = new Section ({
    items: [],
    renderer: (newElement) => {
        createCardServer(newElement);
        emptyElement.remove();
    }
},
'.elements__grid'
)


function createCardList (initialCards) {
    const cardsList = new Section ({
        items: initialCards,
        renderer: (newElement) => {
            if (newElement.owner._id === 'c13cab8ef5f2b7807fb881bf') {
                createCardUser(newElement);
            } else {
                createCardServer(newElement);
            }
            emptyElement.remove();
        }
    },
    '.elements__grid'
    )
    
    cardsList.renderItems();
}

const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: 'b9ca3f7b-fe22-468a-8861-4b4eef5a6009',
        'Content-Type': 'application/json'
    },
})

Promise.all([
    api.getUserData('/users/me'),
    api.getInitialCards('/cards')
])
.then ((values) => {
    const [userData, initialCards] = values;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    createCardList(initialCards);
})
.catch(err => console.log(err));

const profileFormValidator = new FormValidator (myConfig, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator (myConfig, addCardForm);
addCardFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator (myConfig, editAvatarForm);
editAvatarFormValidator.enableValidation();

addCardButton.addEventListener('click', () => { 
    popupAddCard.open();
    addCardFormValidator.clearForm();
});
    
editButton.addEventListener('click', () => {
    popupEditProfile.open();
    const user = userInfo.getUserInfo();
    inputName.value = user.name;
    inputProfession.value = user.about;
    profileFormValidator.clearForm();
})

editAvatarButton.addEventListener('click', () => {
    popupEditAvatar.open();
    editAvatarFormValidator.clearForm();
})
