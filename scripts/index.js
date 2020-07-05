const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const addCardButton = content.querySelector('.profile__add-button');
const popupEditProfile = content.querySelector('.popup_edit_profile');
const popupAddCard = content.querySelector('.popup_edit_add-element');
const closeButtonPopupEditProfile = popupEditProfile.querySelector('.popup__close-button');
const closeButtonPopupAddCard = popupAddCard.querySelector('.popup__close-button');
let profileName = content.querySelector('.profile__name');
let profileProfession = content.querySelector('.profile__profession');
let inputName = popupEditProfile.querySelector('.popup__item_el_name');
let inputProfession = popupEditProfile.querySelector('.popup__item_el_profession');
let inputPlace = popupAddCard.querySelector('.popup__item_el_place');
let inputLink = popupAddCard.querySelector('.popup__item_el_link');

function popupToggle(popup) {
    popup.classList.toggle('popup_opened')
    if (popup.classList.contains('popup_opened')) {
        inputName.value = profileName.textContent;
        inputProfession.value = profileProfession.textContent;
        inputPlace.value = '';
        inputLink.value = '';
    }
}

function formEditProfileSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    popupToggle(popupEditProfile);
}

const cardsListElement = document.querySelector(".elements__grid");

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function addCard(cardData) {
    const card = `
    <li class="element">
    <img src='${cardData.link}' alt='${cardData.name}' class="element__image">
    <div class="element__info">
        <h3 class="element__heading">
            ${cardData.name}
        </h3>
        <button type="button" class="element__like-button">
            <img src="./images/Element__like.svg" class="element__like-image" alt="Лайк">
        </button>
    </div>
</li>
    `
    cardsListElement.insertAdjacentHTML('afterbegin', card);
}

initialCards.forEach(cardData => {
    addCard(cardData);
});

function formAddCardSubmitHandler (evt) {
    evt.preventDefault();
    let newCard = {};
    newCard.name = inputPlace.value;
    newCard.link = inputLink.value;
    addCard(newCard);
    popupToggle(popupAddCard);
}

popupEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
editButton.addEventListener('click', () => { popupToggle(popupEditProfile)});
closeButtonPopupEditProfile.addEventListener('click', () => { popupToggle(popupEditProfile)});
closeButtonPopupAddCard.addEventListener('click', () => { popupToggle(popupAddCard)});
addCardButton.addEventListener('click', () => { popupToggle(popupAddCard)});
popupAddCard.addEventListener('submit', formAddCardSubmitHandler);