import './index.css';
import Card from '../components/Card.js';
import CardUser from '../components/CardUser.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {editButton, addCardButton, emptyElement, profileForm, addCardForm, myConfig, inputName, inputProfession} from '../components/constants.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

const userInfo = new UserInfo (
    '.profile__name',
    '.profile__profession',
    '.profile__photo'
);

const popupFullSizeCard = new PopupWithImage ('.popup_btn_card-image');

const popupEditProfile = new PopupWithForm (
    '.popup_btn_edit-profile',
    (item) => {
        userInfo.setUserInfo(item);
        api.patchProfile('/users/me', item)
            .then (data => console.log(data))
            .catch (err => console.log(err))
    });

const popupDeleteCard = new PopupWithConfirm (
    '.popup_btn_delete-element'
)

const handleLikeClick = (element) => {
    api.getInitialCards('/cards')
    .then((data) => {
        const card = data.find((item) => {
            if (item._id === element.id){
                return item
            }
        })
        return card
    })
    .then((card) => {
        let likes = card.likes.length;
        if (element.querySelector('.element__like-button').classList.contains('element__like-button_active')){
            likes += 1;
            element.querySelector('.element__like-count').textContent = likes;
            api.putLike('/cards/likes', card)
                .catch (err => console.log(err))
        } else {
            likes -= 1;
            element.querySelector('.element__like-count').textContent = likes;
            api.deleteLike('/cards/likes', card)
                .catch (err => console.log(err))
        }
    })
}

const handleDeleteClick = (element) => {
    popupDeleteCard.open();
    const deleteHandler = () => {
        element.remove();
        api.deleteCard('/cards', element)
            .then ((data) => {
                console.log(data);
//                        popupDeleteCard.removeSubmitHandler();
            })
            .catch (err => console.log(err));
    }
    popupDeleteCard.setSubmitHandler(deleteHandler)
}


const createCardUser = (newElement) => {
    const newCard = new CardUser ({
        cardData: newElement, 
        cardSelector: '.element-template', 
        handleCardClick: (item) => {
            popupFullSizeCard.open(item);
            },
        handleDeleteClick: handleDeleteClick,
        handleLikeClick: handleLikeClick
    });
        const cardElement = newCard.generateCard();
        cardsList.addItem (cardElement);
}

const createCardServer = (newElement) => {
    const newCard = new Card ({
        cardData: newElement, 
        cardSelector: '.element-template', 
        handleCardClick: (item) => {
            popupFullSizeCard.open(item);
            },
        handleLikeClick: handleLikeClick
    });
        const cardElement = newCard.generateCard();
        cardElement.querySelector('.element__delete-button').remove();
        cardsList.addItem (cardElement);
}

const popupAddCard = new PopupWithForm (
    '.popup_btn_add-element',
    (newElement) => {
        api.postNewCard('/cards', newElement)
            .then ((data) => {
                console.log(data);
                createCardUser(data);
            })
            .catch (err => console.log(err))
            }
    );

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

api.getUserData('/users/me')
    .then ((data) => {
        const user = {};
        user.name = data.name;
        user.profession = data.about;
        userInfo.setUserInfo(user);
        userInfo.setAvatar(user);
    })
    .catch(err => console.log(err)) 

api.getInitialCards('/cards')
    .then (data => createCardList(data))
    .catch(err => console.log(err))

const profileFormValidator = new FormValidator (myConfig, profileForm);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator (myConfig, addCardForm);
addCardFormValidator.enableValidation();

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
