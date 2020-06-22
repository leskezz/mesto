let content = document.querySelector('.content');
let editButton = content.querySelector('.edit-button');
let popup = content.querySelector('.popup');
let closeButton = popup.querySelector('.close-button');
let profileName = content.querySelector('.profile__name');
let profileProfession = content.querySelector('.profile__profession');
let inputName = popup.querySelector('.popup__item_el_name');
let inputProfession = popup.querySelector('.popup__item_el_profession');

function closePopup() {
    popup.classList.toggle('popup_opened')
    popup.classList.toggle('popup_closed')
}

function openPopup() {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    closePopup();
}

popup.addEventListener('submit', formSubmitHandler);