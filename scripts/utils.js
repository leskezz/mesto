export const popupCardFullSize = document.querySelector('.popup_btn_card-image');
export const popupCardImage = popupCardFullSize.querySelector('.card-full-size__image');
export const popupCardHeading = popupCardFullSize.querySelector('.card-full-size__heading');

export const initialCards = [
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

export function openPopup(popup) {
    popup.classList.add('popup_opened');
};

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeOverlayListeners(popup);
};

function closePopupOnOverlay (evt) {
    const overlay = evt.target;
    if (overlay.classList.contains('popup')) {
        closePopup(overlay);
    }
};

function closePopupOnEscape (evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    } 
};

export function addOverlayListeners (popup) {
        popup.addEventListener('click', closePopupOnOverlay);
        window.addEventListener('keydown', closePopupOnEscape);
};

function removeOverlayListeners (popup) {
        popup.removeEventListener('click', closePopupOnOverlay);
        window.removeEventListener('keydown', closePopupOnEscape);
};