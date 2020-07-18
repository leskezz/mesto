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
const cardTemplate = document.querySelector('.element-template');
const emptyElement = content.querySelector('.element_empty');
let profileName = content.querySelector('.profile__name');
let profileProfession = content.querySelector('.profile__profession');
let inputName = popupEditProfile.querySelector('.popup__item_el_name');
let inputProfession = popupEditProfile.querySelector('.popup__item_el_profession');
let inputPlace = popupAddCard.querySelector('.popup__item_el_place');
let inputLink = popupAddCard.querySelector('.popup__item_el_link');
let popupCardImage = popupCardFullSize.querySelector('.card-full-size__image');
let popupCardHeading = popupCardFullSize.querySelector('.card-full-size__heading');

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

function addCard(cardData) {
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector('.element__heading').textContent = cardData.name;
    card.querySelector('.element__image').src = cardData.link;
    card.querySelector('.element__image').alt = cardData.name;
    emptyElement.remove();
    addCardListeners(card);
    cardsListElement.prepend(card);
}

function addCardListeners(card) {
  card.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  card.querySelector('.element__like-button').addEventListener('click', handleLike);
  card.querySelector('.element__image').addEventListener('click', openPopupCard);
}

function handleDelete (evt) {
    let card = evt.target.closest('.element');
    card.remove();
}

function handleLike (evt) {
    evt.target.classList.toggle('element__like-button_active');
}

initialCards.forEach(cardData => {
    addCard(cardData);
});

function formAddCardSubmitHandler (evt) {
    evt.preventDefault();
    let newCard = {};
    newCard.name = inputPlace.value;
    newCard.link = inputLink.value;
    inputPlace.value = '';
    inputLink.value = '';
    addCard(newCard);
    popupToggle(popupAddCard);
}

function openPopupCard (evt) {
    popupCardImage.src = evt.target.src;
    let card = evt.target.closest('.element');
    let heading = card.querySelector('.element__heading');
    popupCardHeading.textContent = heading.textContent;
    popupToggle(popupCardFullSize);
}

popupEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
editButton.addEventListener('click', () => { popupToggle(popupEditProfile)});
closeButtonPopupEditProfile.addEventListener('click', () => { popupToggle(popupEditProfile)});
closeButtonPopupAddCard.addEventListener('click', () => { popupToggle(popupAddCard)});
addCardButton.addEventListener('click', () => { popupToggle(popupAddCard)});
popupAddCard.addEventListener('submit', formAddCardSubmitHandler);
closeButtonPopupCardFullSize.addEventListener('click', () => { popupToggle(popupCardFullSize) });
