let content = document.querySelector('.content');
let editButton = content.querySelector('.edit-button');
let popup = content.querySelector('.popup');
let closePopup = popup.querySelector('.close-icon');

function openPopup() {
    popup.classList.toggle('popup_opened')
    popup.classList.toggle('popup_closed')
}

editButton.addEventListener('click', openPopup);
closePopup.addEventListener('click', openPopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    let profileName = content.querySelector('.profile__name');
    let profileProfession = content.querySelector('.profile__profession');
    let inputName = popup.querySelector('.popup__item_el_name');
    let inputProfession = popup.querySelector('.popup__item_el_profession');
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
    openPopup();
}

popup.addEventListener('submit', formSubmitHandler);