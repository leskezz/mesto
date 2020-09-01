export default class Api {
    constructor ({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponseData (url, {headers, method, body}) {
        return fetch(url, {headers, method, body})
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                        return Promise.reject(new Error(`Ошибка: ${res.status}`));
                    })
    }

    getUserData (userUrl) {
        return this._getResponseData(`${this._baseUrl}${userUrl}`, {
            headers: this._headers
        })
    }       
    

    getInitialCards (cardsUrl) {
        return this._getResponseData(`${this._baseUrl}${cardsUrl}`, {
            headers: this._headers
        })
    }

    patchProfile (userUrl, newData) {
        return this._getResponseData(`${this._baseUrl}${userUrl}`, {
            method: 'PATCH',
            headers: this._headers, 
            body: JSON.stringify({
                name: newData.name,
                about: newData.about
            })
        })

    }

    postNewCard (cardsUrl, newCard) {
        return this._getResponseData(`${this._baseUrl}${cardsUrl}`, {
            method: 'POST',
            headers: this._headers, 
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link
            })
        })

    }

    deleteCard (cardsUrl, cardToDelete) {
        return this._getResponseData(`${this._baseUrl}${cardsUrl}/${cardToDelete.id}`, {
            method: 'DELETE',
            headers: this._headers, 
        })
    }

    putLike (likesUrl, cardId){
        return this._getResponseData(`${this._baseUrl}${likesUrl}/${cardId}`, {
            method: 'PUT',
            headers: this._headers, 
        })
    }

    deleteLike (likesUrl, cardId){
        return this._getResponseData(`${this._baseUrl}${likesUrl}/${cardId}`, {
            method: 'DELETE',
            headers: this._headers, 
        })
    }

    patchAvatar(avatarUrl, avatar){
        return this._getResponseData(`${this._baseUrl}${avatarUrl}`, {
            method: 'PATCH',
            headers: this._headers, 
            body: JSON.stringify({
                avatar: avatar
            })
        })
    }

}