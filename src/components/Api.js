export default class Api {
    constructor ({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserData (userUrl) {
        return fetch(`${this._baseUrl}${userUrl}`, {
            headers: this._headers
        })
                    .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                    })
    }       
    

    getInitialCards (cardsUrl) {
        return fetch(`${this._baseUrl}${cardsUrl}`, {
            headers: this._headers
        })
                    .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                    })
    }

    patchProfile (userUrl, newData) {
        return fetch(`${this._baseUrl}${userUrl}`, {
            method: 'PATCH',
            headers: this._headers, 
            body: JSON.stringify({
                name: newData.name,
                about: newData.profession
            })
    })
                    .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                    }) 
    }

    postNewCard (cardsUrl, newCard) {
        return fetch(`${this._baseUrl}${cardsUrl}`, {
            method: 'POST',
            headers: this._headers, 
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link
            })
    })
                    .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                    }) 
    }

    deleteCard (cardsUrl, cardToDelete) {
        return fetch(`${this._baseUrl}${cardsUrl}/${cardToDelete.id}`, {
            method: 'DELETE',
            headers: this._headers, 
    })
                    .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status}`);
                    }) 
    }

    putLike (likesUrl, card){
        return fetch(`${this._baseUrl}${likesUrl}/${card._id}`, {
            method: 'PUT',
            headers: this._headers, 
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
            }) 
    }

    deleteLike (likesUrl, card){
        return fetch(`${this._baseUrl}${likesUrl}/${card._id}`, {
            method: 'DELETE',
            headers: this._headers, 
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
            }) 
    }

}