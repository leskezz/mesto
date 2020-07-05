const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const popup = content.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
let profileName = content.querySelector('.profile__name');
let profileProfession = content.querySelector('.profile__profession');
let inputName = popup.querySelector('.popup__item_el_name');
let inputProfession = popup.querySelector('.popup__item_el_profession');

function openClosePopup() {
    popup.classList.toggle('popup_opened')
    if (popup.classList.contains('popup_opened')) {
        inputName.value = profileName.textContent;
        inputProfession.value = profileProfession.textContent;
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    openClosePopup();
}

const cardsListElement = document.querySelector(".elements__grid")

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
    <img src="${cardData.link}" alt="Фото карточки" class="element__image">
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

popup.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openClosePopup);
closeButton.addEventListener('click', openClosePopup);