const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const popup = content.querySelector('.popup');
const closeButton = popup.querySelector('.close-button');
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

popup.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openClosePopup);
closeButton.addEventListener('click', openClosePopup);