export default class UserInfo {
    constructor(nameSelector, professionSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._profession = document.querySelector(professionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._name.textContent;
        userInfo.profession = this._profession.textContent;
        return userInfo;
    }

    setUserInfo(userInfo) {
        this._name.textContent = userInfo.name;
        this._profession.textContent = userInfo.profession;
    }

    setAvatar (userInfo) {
        this._avatar = userInfo.avatar;
    }

}