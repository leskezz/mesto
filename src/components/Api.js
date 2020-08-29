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

}